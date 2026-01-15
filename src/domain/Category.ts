import { Subcategory } from "@/domain/Subcategory";

export class Category {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly subcategories: Subcategory[];

  constructor(data: {
    id: string;
    name: string;
    slug: string;
    description: string;
    subcategories: Subcategory[];
  }) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description;
    this.subcategories = data.subcategories;
  }

  getSubcategoryById(id: string): Subcategory | undefined {
    return this.subcategories.find((subcategory) => subcategory.id === id);
  }
}
