import ToolExplorer from "@/components/ToolExplorer";
import { catalogService } from "@/lib/catalog";
import styles from "./page.module.css";

export default function Home() {
  const categories = catalogService.getCategoryDtos();
  const tools = catalogService.getToolDtos();

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>Community curated</span>
          <h1>Tools Forum</h1>
          <p>
            A GitHub-backed forum with practical guides, grounded scores, and
            honest tradeoffs for tech tools.
          </p>
          <div className={styles.heroMeta}>
            <span>English only</span>
            <span>PR and issue driven</span>
            <span>Static scores for now</span>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <h2>Guide rules</h2>
          <ul>
            <li>Reader level is explicit.</li>
            <li>A fixed "When NOT to use this" section.</li>
            <li>Multi-axis scoring, no fake precision.</li>
          </ul>
        </div>
      </header>

      <ToolExplorer categories={categories} tools={tools} />
    </div>
  );
}
