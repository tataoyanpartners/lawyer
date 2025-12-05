"use client";

import { usePathname} from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  KeyIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayer() {
  const pathname = usePathname();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navItems = [
    { 
      title: "Բլոգի կառավարում", 
      href: "/admin/blog", 
      icon: <DocumentTextIcon className="w-5 h-5" />,
      description: "Կառավարել բլոգային գրառումները"
    },
    {
      title: "Կապի հարցումներ",
      href: "/admin/contacts",
      icon: <EnvelopeIcon className="w-5 h-5" />,
      description: "Դիտել կապի հարցումները"
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Գաղտնաբառերը չեն համընկնում");
      return;
    }

    if (newPassword.length < 8) {
      setError("Նոր գաղտնաբառը պետք է լինի առնվազն 8 նիշ");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setSuccess("Գաղտնաբառը հաջողությամբ փոխվեց:");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setShowPasswordModal(false);
          setSuccess("");
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || "Գաղտնաբառի փոփոխությունը ձախողվեց");
      }
    } catch (error) {
      setError("Սխալ է առաջացել: Կրկին փորձեք:");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <aside className="w-full h-full bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#1e3a8a] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">Թ</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#1e3a8a]">Թաթոյան և գործընկերներ</h1>
              <p className="text-sm text-gray-600">Ադմինիստրատիվ վահանակ</p>
            </div>
          </div>
          
          {/* Admin Profile Card */}
          <Card className="p-4 bg-gray-50 border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[#1e3a8a] text-white font-semibold">
                  Ա
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1e3a8a] truncate">Ադմինիստրատոր</p>
                <p className="text-sm text-gray-600 truncate">
                  baghdasaryan.tatoyanpartners@gmail.com
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-[#1e3a8a] text-white">
                <UserIcon className="w-3 h-3 mr-1" />
                Ադմինիստրատոր
              </Badge>
            </div>
          </Card>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`
                      group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#1e3a8a] text-white shadow-lg"
                          : "hover:bg-gray-100 text-[#1e3a8a] hover:text-[#1e40af]"
                      }
                    `}
                  >
                    <div
                      className={`
                        ${isActive ? "text-white" : "text-[#1e3a8a] group-hover:text-[#1e40af]"}
                      `}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div
                        className={`
                          text-xs 
                          ${
                            isActive
                              ? "text-white/80"
                              : "text-gray-500 group-hover:text-gray-600"
                          }
                        `}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        <Separator />

        {/* Bottom Actions */}
        <div className="p-4 space-y-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-between h-auto p-3 text-[#1e3a8a] hover:text-[#1e40af] hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span>Կարգավորումներ</span>
                </div>
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Հաշվի կարգավորումներ</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowPasswordModal(true)}>
                <KeyIcon className="w-4 h-4 mr-2" />
                Փոխել գաղտնաբառը
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start h-auto p-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            Ելք
          </Button>
        </div>
      </aside>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyIcon className="w-5 h-5 text-[#1e3a8a]" />
              Փոխել գաղտնաբառը
            </DialogTitle>
            <DialogDescription>
              Թարմացրեք ձեր գաղտնաբառը՝ ապահովելու համար ձեր հաշվի անվտանգությունը:
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordChange}>
            <div className="space-y-4 py-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {success}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Ընթացիկ գաղտնաբառ</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Մուտքագրեք ձեր ընթացիկ գաղտնաբառը"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Նոր գաղտնաբառ</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Մուտքագրեք նոր գաղտնաբառը (նվազագույնը 8 նիշ)"
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Հաստատել նոր գաղտնաբառը</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Հաստատեք ձեր նոր գաղտնաբառը"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowPasswordModal(false);
                  setError("");
                  setSuccess("");
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                disabled={isLoading}
              >
                Չեղարկել
              </Button>
              <Button
                type="submit"
                className="bg-[#1e3a8a] hover:bg-[#1e40af]"
                disabled={isLoading}
              >
                {isLoading ? "Փոխարկվում է..." : "Փոխել գաղտնաբառը"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
