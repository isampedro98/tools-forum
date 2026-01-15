import { Category } from "@/domain/Category";
import { Tool } from "@/domain/Tool";

export class Catalog {
  readonly categories: Category[];
  readonly tools: Tool[];

  constructor(data: { categories: Category[]; tools: Tool[] }) {
    this.categories = data.categories;
    this.tools = data.tools;
  }

  getAllCategories(): Category[] {
    return this.categories;
  }

  getAllTools(): Tool[] {
    return this.tools;
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find((category) => category.slug === slug);
  }

  getToolBySlug(slug: string): Tool | undefined {
    return this.tools.find((tool) => tool.slug === slug);
  }

  getToolsByCategory(categoryId: string): Tool[] {
    return this.tools.filter((tool) => tool.categoryId === categoryId);
  }
}
