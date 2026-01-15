import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogService } from "@/lib/catalog";
import { scoreService } from "@/lib/score";
import styles from "./page.module.css";

export function generateStaticParams() {
  return catalogService.getAllTools().map((tool) => ({
    slug: tool.slug,
  }));
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = catalogService.getToolBySlug(params.slug);
  if (!tool) {
    notFound();
  }

  const category = catalogService
    .getAllCategories()
    .find((item) => item.id === tool.categoryId);
  const subcategory = category?.subcategories.find(
    (item) => item.id === tool.subcategoryId
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/">
          Back to home
        </Link>
        <div className={styles.headerTop}>
          <div>
            <h1>{tool.name}</h1>
            <p>{tool.description}</p>
          </div>
          <div className={styles.scoreBadge}>
            {scoreService.getFinalScore(tool.scores)}
            <span>final score</span>
          </div>
        </div>
        <div className={styles.meta}>
          <span>
            {category?.name} / {subcategory?.name}
          </span>
          <span>Reader level: {tool.level}</span>
          <span>Updated {new Date(tool.updatedAt).toLocaleDateString("en-US")}</span>
        </div>
      </header>

      <section className={styles.section}>
        <h2>Scores</h2>
        <div className={styles.scoreGrid}>
          {scoreService.getAxes().map((axis) => (
            <div key={axis.key} className={styles.scoreCard}>
              <div>
                <h3>{axis.label}</h3>
                <p>{axis.description}</p>
              </div>
              <strong>{tool.scores[axis.key]}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>When NOT to use this</h2>
        <ul className={styles.avoidList}>
          {tool.whenNotToUse.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Guides</h2>
        <div className={styles.guides}>
          {tool.guides.map((guide) => (
            <article key={guide.title} className={styles.guideCard}>
              <h3>{guide.title}</h3>
              <ul>
                {guide.content.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {guide.code ? (
                <pre>
                  <code>{guide.code.snippet}</code>
                </pre>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
