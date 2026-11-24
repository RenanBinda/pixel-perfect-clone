import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { requireAuth } from "@/lib/admin-access.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    await requireAuth(location.href);
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
