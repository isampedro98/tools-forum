import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalog";
import { scoreService } from "@/lib/score";
import styles from "./page.module.css";

export function generateStaticParams() {
  return catalogService.getAllCategories().map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = catalogService.getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const tools = catalogService.getToolsByCategory(category.id);
  const toolsBySubcategory = category.subcategories.map((subcategory) => ({
    subcategory,
    tools: tools.filter((tool) => tool.subcategoryId === subcategory.id),
  }));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/">
          Back to home
        </Link>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </header>

      <div className={styles.sectionGrid}>
        {toolsBySubcategory.map(({ subcategory, tools }) => (
          <section key={subcategory.id} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>{subcategory.name}</h2>
              <span>{tools.length} tools</span>
            </div>
            <p className={styles.sectionDescription}>{subcategory.description}</p>
            <div className={styles.toolList}>
              {tools.map((tool) => (
                <article key={tool.id} className={styles.toolCard}>
                  <div className={styles.toolTop}>
                    <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                    <span className={styles.score}>
                      {scoreService.getFinalScore(tool.scores)}
                    </span>
                  </div>
                  <p>{tool.description}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
