import { SidebarProvider } from "@/components/ui/sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider style={{ "--sidebar-width": "4rem" } as React.CSSProperties}>
      {children}
    </SidebarProvider>
  );
}
