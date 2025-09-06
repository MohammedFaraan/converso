"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List } from "lucide-react";
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
      <nav className="flex items-center gap-4">
        {navItems.map(({ label, href }) => (
          <Link
            href={href}
            key={label}
            className={cn(pathname == href && "text-primary font-semibold")}
          >
            {label}
          </Link>
        ))}
      </nav>
    );
  }

  // Mobile view
  return (
    <nav className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center p-2">
          <List size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {navItems.map(({ label, href }) => (
            <DropdownMenuItem key={label} asChild>
              <Link
                href={href}
                className={cn(pathname == href && "text-primary font-semibold", "w-full")}
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
