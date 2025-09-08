"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Set initial value
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Clean up
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Desktop view
  if (!isMobile) {
    return (
      <nav className="hidden md:flex items-center space-x-1">
        {navItems.map(({ label, href }) => (
          <Link
            href={href}
            key={label}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors relative group",
              pathname === href 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            {label}
            {pathname === href && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transform origin-left" />
            )}
          </Link>
        ))}
      </nav>
    );
  }

  // Mobile view
  return (
    <nav className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <Menu size={20} />
          <span className="sr-only">Navigation menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-md border bg-popover p-2 shadow-md">
          {navItems.map(({ label, href }) => (
            <DropdownMenuItem key={label} asChild>
              <Link
                href={href}
                className={cn(
                  "flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors",
                  pathname === href 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavItems;
