export class SearchService {
  levenshteinDistance(a: string, b: string): number {
    if (a === b) {
      return 0;
    }
    if (!a) {
      return b.length;
    }
    if (!b) {
      return a.length;
    }

    const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i += 1) {
      matrix[i][0] = i;
    }
    for (let j = 0; j <= b.length; j += 1) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= a.length; i += 1) {
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[a.length][b.length];
  }

  fuzzyIncludes(text: string, query: string): boolean {
    const cleanedQuery = query.trim().toLowerCase();
    if (!cleanedQuery) {
      return true;
    }

    const cleanedText = text.toLowerCase();
    if (cleanedText.includes(cleanedQuery)) {
      return true;
    }

    const words = cleanedText.split(/[^a-z0-9]+/g).filter(Boolean);
    return words.some(
      (word) => this.levenshteinDistance(word, cleanedQuery) <= 2
    );
  }
}

export const searchService = new SearchService();
