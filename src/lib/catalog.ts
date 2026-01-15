import catalog from "@/data/catalog.json";
import { Catalog } from "@/domain/Catalog";
import { Category } from "@/domain/Category";
import { Subcategory } from "@/domain/Subcategory";
import { Tool, type ReaderLevel } from "@/domain/Tool";
import { ToolGuide } from "@/domain/ToolGuide";
import type { ToolScores } from "@/lib/score";

export { Catalog, Category, Subcategory, Tool, ToolGuide, type ReaderLevel };

export type CategoryDto = {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
    description: string;
  }[];
};

export type ToolDto = {
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
  guides: {
    title: string;
    content: string[];
    code?: {
      language: string;
      snippet: string;
    };
  }[];
};

type RawSubcategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

type RawCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: RawSubcategory[];
};

type RawToolGuide = {
  title: string;
  content: string[];
  code?: {
    language: string;
    snippet: string;
  };
};

type RawTool = {
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
  guides: RawToolGuide[];
};

type RawCatalog = {
  categories: RawCategory[];
  tools: RawTool[];
};

class CatalogRepository {
  private catalog?: Catalog;

  getCatalog(): Catalog {
    if (!this.catalog) {
      this.catalog = this.buildCatalog(catalog as RawCatalog);
    }
    return this.catalog;
  }

  private buildCatalog(data: RawCatalog): Catalog {
    const categories = data.categories.map(
      (category) =>
        new Category({
          ...category,
          subcategories: category.subcategories.map(
            (subcategory) => new Subcategory(subcategory)
          ),
        })
    );

    const tools = data.tools.map(
      (tool) =>
        new Tool({
          ...tool,
          guides: tool.guides.map((guide) => new ToolGuide(guide)),
        })
    );

    return new Catalog({ categories, tools });
  }
}

export class CatalogService {
  constructor(private readonly repository: CatalogRepository) {}

  getCatalog(): Catalog {
    return this.repository.getCatalog();
  }

  getAllCategories(): Category[] {
    return this.getCatalog().getAllCategories();
  }

  getAllTools(): Tool[] {
    return this.getCatalog().getAllTools();
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this.getCatalog().getCategoryBySlug(slug);
  }

  getToolBySlug(slug: string): Tool | undefined {
    return this.getCatalog().getToolBySlug(slug);
  }

  getToolsByCategory(categoryId: string): Tool[] {
    return this.getCatalog().getToolsByCategory(categoryId);
  }

  getCategoryDtos(): CategoryDto[] {
    return this.getAllCategories().map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      subcategories: category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
      })),
    }));
  }

  getToolDtos(): ToolDto[] {
    return this.getAllTools().map((tool) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      categoryId: tool.categoryId,
      subcategoryId: tool.subcategoryId,
      description: tool.description,
      scores: tool.scores,
      level: tool.level,
      createdAt: tool.createdAt,
      updatedAt: tool.updatedAt,
      whenNotToUse: [...tool.whenNotToUse],
      guides: tool.guides.map((guide) => ({
        title: guide.title,
        content: [...guide.content],
        code: guide.code
          ? { language: guide.code.language, snippet: guide.code.snippet }
          : undefined,
      })),
    }));
  }
}

const catalogRepository = new CatalogRepository();
export const catalogService = new CatalogService(catalogRepository);
