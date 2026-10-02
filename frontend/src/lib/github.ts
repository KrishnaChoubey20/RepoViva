import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Limits
const MAX_FILES = 40;
const MAX_FILE_SIZE_BYTES = 50 * 1024; // 50KB
const MAX_TOTAL_SIZE_BYTES = 500 * 1024; // 500KB

const IGNORED_DIRS = new Set([
    'node_modules', 'vendor', '.git', '.github', 'dist', 'build', 'out', '.next', 'coverage', 'venv', '.venv'
]);
const IGNORED_EXTS = new Set([
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.mp3', '.zip', '.tar', '.gz', '.pdf', '.exe', '.dll', '.so', '.dylib', '.pyc', '.class'
]);
const SECRET_FILES = new Set([
    '.env', '.env.local', 'id_rsa', 'id_dsa', 'credentials.json', 'secrets.json'
]);

export interface GithubRepoInfo {
    owner: string;
    repo: string;
}

export function parseGithubUrl(url: string): GithubRepoInfo | null {
    try {
        const parsed = new URL(url);
        if (parsed.hostname !== 'github.com') return null;
        const parts = parsed.pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
            let repo = parts[1];
            if (repo.endsWith('.git')) repo = repo.slice(0, -4);
            return { owner: parts[0], repo };
        }
        return null;
    } catch {
        return null;
    }
}

export async function fetchRepositoryData(owner: string, repo: string) {
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'RepoViva-MVP'
    };
    if (GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    // 1. Fetch metadata
    const metaRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    const metadata = metaRes.data;

    // 2. Fetch default branch info to get commit SHA
    const defaultBranch = metadata.default_branch;
    const branchRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches/${defaultBranch}`, { headers });
    const commitSha = branchRes.data.commit.sha;

    // 3. Fetch file tree
    const treeRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/${commitSha}?recursive=1`, { headers });
    const tree = treeRes.data.tree;

    // Filter files
    let selectedFiles = [];
    let totalSize = 0;

    // Prioritize important root files (package.json, tsconfig.json, etc.)
    const PRIORITY_FILES = new Set(['package.json', 'tsconfig.json', 'README.md', 'next.config.js', 'next.config.ts']);
    
    // Sort tree so priority files come first
    const sortedTree = [...tree].sort((a, b) => {
        const aPriority = PRIORITY_FILES.has(a.path.split('/').pop() || '') ? -1 : 1;
        const bPriority = PRIORITY_FILES.has(b.path.split('/').pop() || '') ? -1 : 1;
        return aPriority - bPriority;
    });

    for (const item of sortedTree) {
        if (item.type !== 'blob') continue;
        
        const pathParts = item.path.split('/');
        const filename = pathParts[pathParts.length - 1];
        const ext = filename.includes('.') ? '.' + filename.split('.').pop()?.toLowerCase() : '';
        
        // Exclude ignored dirs
        if (pathParts.some((part: string) => IGNORED_DIRS.has(part))) continue;
        
        // Exclude ignored exts
        if (ext && IGNORED_EXTS.has(ext)) continue;
        
        // Exclude secret files
        if (SECRET_FILES.has(filename)) continue;

        // Size limit
        if (item.size > MAX_FILE_SIZE_BYTES) continue;

        selectedFiles.push(item);
    }

    selectedFiles = selectedFiles.slice(0, MAX_FILES);

    const fileContents: Record<string, string> = {};

    // 4. Fetch file contents
    for (const file of selectedFiles) {
        if (totalSize + file.size > MAX_TOTAL_SIZE_BYTES) break;
        try {
            const contentRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${file.path}?ref=${commitSha}`, { headers });
            if (contentRes.data.content) {
                const content = Buffer.from(contentRes.data.content, 'base64').toString('utf-8');
                fileContents[file.path] = content;
                totalSize += file.size;
            }
        } catch (err) {
            console.error(`Failed to fetch ${file.path}`);
        }
    }

    return {
        metadata: {
            name: metadata.name,
            description: metadata.description,
            stars: metadata.stargazers_count,
            language: metadata.language,
            default_branch: defaultBranch,
            commit_sha: commitSha
        },
        files: fileContents
    };
}
