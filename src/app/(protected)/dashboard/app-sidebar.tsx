"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Bot, CreditCard, LayoutDashboard, PlusCircleIcon, Presentation } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PlusCircle } from "lucide-react"; 
import {Button} from "@/components/ui/button"
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q & A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

const projects=[
    {
        name:'Project 1'
    },
    {
        name:'Project 2'
    },   
    {
        name:'Project 3'
    },
    ];

export function AppSideBar() {
  const pathName = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <span className="text-lg font-bold"> Logo</span>
      </SidebarHeader>

      <SidebarContent>
        {/* Application Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md",
                      {
                        "!bg-primary !text-white": pathName === item.url,
                        "hover:bg-gray-100": pathName !== item.url,
                      }
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Your Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel>My Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <div
                      className={cn(
                        "rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary",
                        {
                          "bg-primary text-white": true, 
                        }
                      )}
                    >
                      {project.name[0]}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="h-2"></div>
              <SidebarMenuItem>
                <Link href='/create'>
              <Button size='sm' variant={'outline'} className="w-fit">
                    <PlusCircleIcon/>
                    Create New Project
              </Button>
              </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}


  
