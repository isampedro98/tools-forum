import type { ToolScores } from "@/lib/score";
import { ToolGuide } from "@/domain/ToolGuide";

export type ReaderLevel = "Beginner" | "Intermediate" | "Advanced";

export class Tool {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly categoryId: string;
  readonly subcategoryId: string;
  readonly description: string;
  readonly scores: ToolScores;
  readonly level: ReaderLevel;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly whenNotToUse: string[];
  readonly guides: ToolGuide[];

  constructor(data: {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    subcategoryId: string;
    description: string;
    scores: ToolScores;
    level: ReaderLevel;
    createdAt: string;
    updatedAt: string;
    whenNotToUse: string[];
    guides: ToolGuide[];
  }) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.categoryId = data.categoryId;
    this.subcategoryId = data.subcategoryId;
    this.description = data.description;
    this.scores = data.scores;
    this.level = data.level;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.whenNotToUse = data.whenNotToUse;
    this.guides = data.guides;
  }
}
