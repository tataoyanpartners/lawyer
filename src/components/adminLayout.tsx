"use client";

import { useState } from "react";
import AdminLayer from "./adminLayer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminLayer />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0 bg-white">
          <AdminLayer />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#486BAD] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Թ</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#486BAD]">Թաթոյան և գործընկերներ</h1>
                <p className="text-xs text-gray-600">Ադմինիստրատիվ վահանակ</p>
              </div>
            </div>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Bars3Icon className="w-6 h-6 text-[#486BAD]" />
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
        </div>

        {/* Page Content */}
        <div className="h-full overflow-y-auto bg-white">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}