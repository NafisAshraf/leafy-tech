"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  BarChart2,
  Thermometer,
  Zap,
  Bell,
  Settings,
  Menu,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white py-4 border-bottom mb-3">
      <div className="container px-0 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-3xl font-bold">
              Navdynamicx
            </Link>
            <span className="text-lg font-light">IoT Dashboard</span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavItem href="/" icon={<Home className="h-5 w-5" />} text="Home" />
            <NavItem
              href="/analytics"
              icon={<BarChart2 className="h-5 w-5" />}
              text="Analytics"
            />
            <NavItem
              href="/devices"
              icon={<Thermometer className="h-5 w-5" />}
              text="Devices"
            />
            <NavItem
              href="/energy"
              icon={<Zap className="h-5 w-5" />}
              text="Energy"
            />
            <NavItem
              href="/alerts"
              icon={<Bell className="h-5 w-5" />}
              text="Alerts"
            />
            <NavItem
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              text="Settings"
            />

            {/* Profile Avatar and Dropdown */}
            <ProfileMenu />
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavItem
              href="/"
              icon={<Home className="h-5 w-5" />}
              text="Home"
              mobile
            />
            <NavItem
              href="/analytics"
              icon={<BarChart2 className="h-5 w-5" />}
              text="Analytics"
              mobile
            />
            <NavItem
              href="/devices"
              icon={<Thermometer className="h-5 w-5" />}
              text="Devices"
              mobile
            />
            <NavItem
              href="/energy"
              icon={<Zap className="h-5 w-5" />}
              text="Energy"
              mobile
            />
            <NavItem
              href="/alerts"
              icon={<Bell className="h-5 w-5" />}
              text="Alerts"
              mobile
            />
            <NavItem
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              text="Settings"
              mobile
            />

            {/* Mobile Profile Menu */}
            <div className="pt-2">
              <ProfileMenu mobile />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  text,
  mobile = false,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 hover:text-gray-300 transition-colors ${
        mobile ? "block py-2 text-lg" : "text-base"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

function ProfileMenu({ mobile = false }: { mobile?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Account settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
