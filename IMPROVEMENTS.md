# Repo briefing: improvements and MVC/OOP assessment

Date: 2026-01-28

## MVC and OOP assessment
- Current separation is "MVC-ish" for a Next.js App Router app.
  - Model: `src/domain`, `src/data`, `src/lib/catalog.ts`
  - View: `src/components`, `src/app/*`
  - Controller: page components orchestrating data
- Separation breaks a bit because view components handle controller-like logic (filter/sort/search in `src/components/ToolExplorer.tsx`).
- Domain classes are mostly data containers with little behavior; this is closer to DTOs than rich domain objects.

## High-value improvements (actionable)
1) Add missing category page
   - Links point to `/categories/[slug]` but `src/app/categories/[slug]` has no page.
   - Add `src/app/categories/[slug]/page.tsx` or remove links.

2) Split layers in catalog module
   - `src/lib/catalog.ts` mixes repository, service, DTO mapping, and re-exports.
   - Suggested split:
     - `src/data/catalogRepository.ts`
     - `src/application/catalogService.ts`
     - `src/application/dtos.ts`

3) Strengthen immutability
   - Domain models expose arrays directly. Return copies or use readonly arrays.
   - DTOs should be deep-copied or frozen to prevent UI mutation.

4) Add domain invariants and validation
   - Validate score ranges (e.g., 0-10), ISO dates, and category/subcategory/tool IDs.
   - Enforce in constructors or via a schema validator when building the catalog.

5) Move search/sort logic out of UI when it grows
   - Shift filter/sort computation to a use case or helper function.
   - Keep components focused on rendering.

6) Normalize date formatting
   - Repeated `new Date(...)` formatting in UI can be centralized in a formatter utility or precomputed in DTOs.

## Other nits / low-risk improvements
- `ScoreService` and `SearchService` could be pure functions or static helpers since they are stateless.
- Consider a value object for `ToolScores` to encode valid ranges and reduce misuse.
- Add unit tests for `SearchService` and `ScoreService` (deterministic, low effort).

---

## Product positioning + traction notes (curated)
### What already feels product-shaped
- Clear editorial vision: curated, practical, and opinionated, with a fixed "When NOT to use this" section.
- Explicit content model (Category → Subcategory → Tool) with guides, snippets, and timestamps.
- Search + sort defined up front (score, date, alphabetical; fuzzy matching).
- Versioning + changelog discipline from day one (0.1.0).

### Base-rate risk (direct critique)
- Tool rankings are crowded and often fail because:
  - Scoring is subjective and easy to attack.
  - Good content requires ongoing editorial maintenance.
  - "Forum" dynamics rarely start without critical mass.
- Your editorial-first approach mitigates this, but you still need a sharper angle to create return visits.

### Directional moves to increase traction (without over-scaling)
- Position it as a curated handbook rather than a forum for now; keep "community" in GitHub Issues/Discussions.
- Emphasize decision guidance instead of ranking:
  - "If you are in X context, pick A; if in Y, pick B."
- Keep the final score secondary; lead with tradeoffs and "when NOT to use."

### High-ROI technical improvements (fast wins)
- Add CI schema validation for `catalog.json` (Zod + script) so PRs cannot break the site.
- Enforce ID/slug uniqueness and referential integrity in CI.
- Improve search beyond Levenshtein<=2:
  - Tokenization + prefix match, or use Fuse.js for a better multi-word experience.
- Consider authoring guides in MDX/Markdown per tool (JSON is not great for long-form writing).

### README messaging (clarity for portfolio / expectations)
- Add a short "Why this exists" section at the top:
  - This is a curated, opinionated catalog (not a crowdsourced forum).
  - Demonstrates structured content modeling and GitHub-based editorial workflow.
  - Prioritizes decision-oriented documentation over rankings.

### Portfolio signal (cheap and strong)
- Add a "Design decisions" page/section:
  - Why no crowd voting.
  - Why editorial scores.
  - Why GitHub for workflow.
  - Why "When NOT to use."
