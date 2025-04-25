import { AppSidebar } from "@/components/app_sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
    </SidebarProvider>
  );
}
