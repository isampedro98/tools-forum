const scoreAxes = [
  {
    key: "learningCurve",
    label: "Learning Curve",
    description: "How hard it is to get started.",
  },
  {
    key: "ecosystem",
    label: "Ecosystem",
    description: "Libraries, community, integrations.",
  },
  {
    key: "jobMarket",
    label: "Job Market",
    description: "Hiring demand and opportunities.",
  },
  {
    key: "longTermViability",
    label: "Long-term Viability",
    description: "Risk of obsolescence.",
  },
  {
    key: "dx",
    label: "DX",
    description: "Developer experience and tooling.",
  },
] as const;

export type ScoreKey = (typeof scoreAxes)[number]["key"];

export type ToolScores = Record<ScoreKey, number>;

export class ScoreService {
  private readonly axes = scoreAxes;

  getAxes() {
    return this.axes;
  }

  getFinalScore(scores: ToolScores): number {
    const total = this.axes.reduce((sum, axis) => sum + scores[axis.key], 0);
    return Math.round((total / this.axes.length) * 10) / 10;
  }
}

export const scoreService = new ScoreService();
