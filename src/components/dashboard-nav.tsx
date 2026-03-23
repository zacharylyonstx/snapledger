"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Zap, User, LogOut, Key, CreditCard } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function DashboardNav({ user }: { user: SupabaseUser }) {
  const router = useRouter();
  const supabase = createClient();

  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "U";

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Zap className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold">SnapLedger</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Documents
            </Button>
          </Link>
          <Link href="/dashboard/api-keys">
            <Button variant="ghost" size="sm">
              API Keys
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium truncate">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/dashboard/api-keys" className="flex items-center w-full">
                  <Key className="mr-2 h-4 w-4" />
                  API Keys
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/dashboard/billing" className="flex items-center w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
