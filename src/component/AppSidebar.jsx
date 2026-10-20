import {
  Home,
  FileArchive,
  File,
  Search,
  Settings,
  User2,
  Users,
  ChevronUp,
  LogOut,
  ShoppingBasket,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/component/ui/sidebar";

import { Link } from "react-router-dom";

// Menu navigasi utama
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Order", url: "/transaction", icon: ShoppingBasket },
  { title: "Product", url: "/products", icon: FileArchive },
  { title: "Category", url: "/category", icon: File },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* Header Aplikasi / Logo */}
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            A
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">My Workspace</span>
            <span className="text-xs text-muted-foreground">Pro Plan</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Menu / Navigasi Utama */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Navigasi</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    render={<Link to={item.url} />}
                  >
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bagian Bawah / Profil User */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <User2 className="h-4 w-4" />
                <span className="text-sm font-medium">John Doe</span>
              </div>
              <ChevronUp className="h-4 w-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
