import { describe, it, expect } from 'vitest';
import { parseGithubUrl } from './github';

describe('parseGithubUrl', () => {
    it('should parse a standard valid URL', () => {
        const result = parseGithubUrl('https://github.com/facebook/react');
        expect(result).toEqual({ owner: 'facebook', repo: 'react' });
    });

    it('should ignore trailing slashes', () => {
        const result = parseGithubUrl('https://github.com/vercel/next.js/');
        expect(result).toEqual({ owner: 'vercel', repo: 'next.js' });
    });

    it('should ignore .git suffix', () => {
        const result = parseGithubUrl('https://github.com/torvalds/linux.git');
        expect(result).toEqual({ owner: 'torvalds', repo: 'linux' });
    });

    it('should return null for non-github domains', () => {
        const result = parseGithubUrl('https://gitlab.com/owner/repo');
        expect(result).toBeNull();
    });

    it('should return null for invalid paths', () => {
        const result = parseGithubUrl('https://github.com/owner-only');
        expect(result).toBeNull();
    });
});
