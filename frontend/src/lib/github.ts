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

    // 2. Fetch file tree
    const defaultBranch = metadata.default_branch;
    const treeRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`, { headers });
    const tree = treeRes.data.tree;

    // Filter files
    let selectedFiles = [];
    let totalSize = 0;

    // Sort to prioritize README and important files? 
    // We'll just take them as they come, but prioritize root files or specific names if needed.
    // For MVP, simple iteration is fine.
    for (const item of tree) {
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

    // Sort to prioritize likely source code, package.json, etc. 
    // Just limit to MAX_FILES
    selectedFiles = selectedFiles.slice(0, MAX_FILES);

    const fileContents: Record<string, string> = {};

    // 3. Fetch file contents
    for (const file of selectedFiles) {
        if (totalSize + file.size > MAX_TOTAL_SIZE_BYTES) break;
        try {
            const contentRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`, { headers });
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
            language: metadata.language
        },
        files: fileContents
    };
}
