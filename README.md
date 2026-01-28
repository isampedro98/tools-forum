# tools-forum

GitHub-backed forum for curated, practical guides on tech tools.

Current version: `0.1.0`

## Vision
- Open and free knowledge with real-world usefulness.
- Editorial curation via PRs and issues.
- Static scores for now, with room to evolve.

## Content Structure
- Category -> Subcategory -> Tool.
- Each tool includes:
  - Short description.
  - Multi-axis scores (not a single number).
  - Reader level (Beginner/Intermediate/Advanced).
  - Fixed section: "When NOT to use this".
  - Internal guides with best practices.
  - Code examples when relevant.

## Stack
- Next.js App Router + TypeScript.
- Package manager: pnpm.
- Data source: JSON.
- Language: English only.

## Routes
- `/` Home and search.
- `/categories/[slug]` Category detail.
- `/tools/[slug]` Tool detail.

## Search and Sort
- Sort: score, updated/created date, alphabetical.
- Search: free-text with simple fuzzy match (Levenshtein <= 2).

## Local Development
```bash
pnpm install
pnpm dev
```

## Versioning & Changelog
- Versioning follows `major.minor.patch`.
- The major version must remain `0` until we have a real MVP.
- Every change increments the version (major, minor, or patch).
- `CHANGELOG.md` groups entries by minor version.
  - Each minor version should include a brief summary of the patches within that minor.

## Data Model
Primary data lives in `src/data/catalog.json`.

Category shape:
```json
{
  "id": "programming-languages",
  "name": "Programming Languages",
  "slug": "programming-languages",
  "description": "...",
  "subcategories": [
    { "id": "oop", "name": "OOP", "slug": "oop", "description": "..." }
  ]
}
```

Tool shape:
```json
{
  "id": "python",
  "name": "Python",
  "slug": "python",
  "categoryId": "programming-languages",
  "subcategoryId": "multi-paradigm",
  "description": "...",
  "scores": {
    "learningCurve": 4,
    "ecosystem": 9,
    "jobMarket": 9,
    "longTermViability": 8,
    "dx": 8
  },
  "level": "Beginner",
  "createdAt": "2024-09-05",
  "updatedAt": "2026-01-14",
  "whenNotToUse": ["..."],
  "guides": [
    {
      "title": "Project Layout",
      "content": ["..."],
      "code": { "language": "python", "snippet": "..." }
    }
  ]
}
```

## Scoring Axes
- Learning Curve
- Ecosystem
- Job Market
- Long-term Viability
- DX (Developer Experience)
- Final score = editorial average

## Contributions
- Via PR: add or edit categories, subcategories, or tools.
- Via issue: suggestions or new proposals.
- Manual admin review before merge.

## Status
Early build. GitHub-hosted for now; deployment later.
