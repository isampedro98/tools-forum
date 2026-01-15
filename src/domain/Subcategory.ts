export class Subcategory {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;

  constructor(data: { id: string; name: string; slug: string; description: string }) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description;
  }
}
