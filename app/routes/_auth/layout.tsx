import { AppSidebar } from "@/ui/shared/components/app-sidebar";
import { SiteHeader } from "@/ui/shared/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireAuth } from "@/middlewares/auth.server";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { getSession } from "@/services/auth.service.server";

export const middleware = [requireAuth];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  return { user: session?.user ?? null };
}

export default function AuthLayout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <SidebarProvider
      
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <AppSidebar variant="inset" user={user}  />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
