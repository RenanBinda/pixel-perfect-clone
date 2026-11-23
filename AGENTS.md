<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Admin pages are gated by a server-verified access code (ADMIN_ACCESS_CODE secret, httpOnly cookie) because the site has no real auth backend yet.
- Protected areas (/admin/*, /conta, /smis/*) use ssr: false + client beforeLoad guard; /admin.tsx layout gates the whole admin tree. Why: session lives in localStorage, server cannot verify it.
- Request error handling preserves framework redirects, not-found signals and intentional HTTP responses; the explicit server entry handles only unexpected failures, so navigation never becomes a generic 500.
- Landing path content uses a validated shared schema and route-loaded Query cache; profile-specific publication is stored in Cloud with optimistic revisions so edits do not overwrite another editor's work.
- Content publication requires a server-verified administrative code and a short-lived signed httpOnly cookie; client persona selection and existing role guards never authorize writes.
- Keep the existing visitor account client separate from the content database integration; enabling content persistence must not migrate existing users or change their sign-in system.
