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
