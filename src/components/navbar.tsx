"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toogle";
import { useSearchParams } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Charts", href: "/dashboard/charts" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isCurrent = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="w-full border-b bg-background not-dark:**:text-blue-950">
      <div className="mx-auto flex h-16 max-w-5xl gap-8 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="NEOs logo" width={36} height={36} />
          <span className="font-semibold text-lg md:text-xl">
            NEOs Dashboard
          </span>
        </Link>

        <div className="hidden sm:flex items-center justify-start gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={`${item.href}?${searchParams.toString()}`}
              className={
                isCurrent(item.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden sm:flex items-center ml-auto">
          <ThemeToggle />
        </div>

        <div className="sm:hidden flex items-center ml-auto">
          <Collapsible open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="absolute top-16 left-0 z-50 w-full border-t border-b bg-background p-4 shadow-md m:hidden">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={`${item.href}?${searchParams.toString()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={
                      isCurrent(item.href)
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="flex justify-end">
                  <ThemeToggle />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </nav>
  );
}
