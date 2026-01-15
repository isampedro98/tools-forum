"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CategoryDto, ToolDto } from "@/lib/catalog";
import { scoreService } from "@/lib/score";
import { searchService } from "@/lib/search";
import styles from "@/components/ToolExplorer.module.css";

type SortKey = "score" | "updated" | "created" | "alpha";

type ToolExplorerProps = {
  categories: CategoryDto[];
  tools: ToolDto[];
};

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "score", label: "Score" },
  { value: "updated", label: "Recently updated" },
  { value: "created", label: "Recently created" },
  { value: "alpha", label: "A to Z" },
];

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function ToolExplorer({ categories, tools }: ToolExplorerProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("score");

  const categoryMap = useMemo(() => {
    const map = new Map<string, CategoryDto>();
    categories.forEach((category) => map.set(category.id, category));
    return map;
  }, [categories]);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const results = tools.filter((tool) => {
      const category = categoryMap.get(tool.categoryId);
      const subcategory = category?.subcategories.find(
        (item) => item.id === tool.subcategoryId
      );
      const haystack = [
        tool.name,
        tool.description,
        category?.name ?? "",
        subcategory?.name ?? "",
      ].join(" ");
      return searchService.fuzzyIncludes(haystack, normalizedQuery);
    });

    return results.sort((a, b) => {
      if (sort === "alpha") {
        return a.name.localeCompare(b.name);
      }
      if (sort === "created") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sort === "updated") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      return (
        scoreService.getFinalScore(b.scores) -
        scoreService.getFinalScore(a.scores)
      );
    });
  }, [categoryMap, query, sort, tools]);

  return (
    <section className={styles.explorer}>
      <div className={styles.controls}>
        <label className={styles.searchLabel}>
          <span>Search</span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Try: python, UI, game, editor..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className={styles.sortLabel}>
          <span>Sort</span>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <h2>Categories</h2>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li key={category.id} className={styles.categoryItem}>
                <Link className={styles.categoryLink} href={`/categories/${category.slug}`}>
                  {category.name}
                </Link>
                <ul className={styles.subcategoryList}>
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id} className={styles.subcategoryItem}>
                      <span className={styles.branch}>└</span>
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.toolPanel}>
          <div className={styles.toolHeader}>
            <h2>Tools</h2>
            <span className={styles.count}>{filteredTools.length} items</span>
          </div>

          <div className={styles.toolGrid}>
            {filteredTools.map((tool) => {
              const category = categoryMap.get(tool.categoryId);
              const subcategory = category?.subcategories.find(
                (item) => item.id === tool.subcategoryId
              );
              return (
                <article key={tool.id} className={styles.toolCard}>
                  <div className={styles.toolTop}>
                    <Link className={styles.toolName} href={`/tools/${tool.slug}`}>
                      {tool.name}
                    </Link>
                    <span className={styles.toolScore}>
                      {scoreService.getFinalScore(tool.scores)}
                    </span>
                  </div>
                  <p className={styles.toolDescription}>{tool.description}</p>
                  <div className={styles.toolMeta}>
                    <span>
                      {category?.name} / {subcategory?.name}
                    </span>
                    <span>Updated {formatDate(tool.updatedAt)}</span>
                  </div>
                  <div className={styles.scoreRow}>
                    {scoreService.getAxes().map((axis) => (
                      <div key={axis.key} className={styles.scoreItem}>
                        <span>{axis.label}</span>
                        <strong>{tool.scores[axis.key]}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
