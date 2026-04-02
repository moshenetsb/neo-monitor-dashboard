"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { name: "light", icon: Sun },
  { name: "dark", icon: Moon },
  { name: "system", icon: Monitor },
] as const;

export default function ThemeToogle() {
  const { resolvedTheme, theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-10 [&_svg]:size-5">
          {resolvedTheme === "light" ? <Sun /> : <Moon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((_theme) => (
          <DropdownMenuItem
            onClick={() => {
              setTheme(_theme.name);
            }}
            key={_theme.name}
            className={theme === _theme.name ? "bg-accent/50" : ""}
          >
            <_theme.icon className="mr-2" />
            {_theme.name.charAt(0).toUpperCase() + _theme.name.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      variant="outline"
      className="border-foreground size-10 [&_svg]:size-5"
    >
      <Sun />
    </Button>
  );
}
