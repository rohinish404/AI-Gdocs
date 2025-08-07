import Link from "next/link";
import { SearchInput } from "./search-input";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <h3 className="text-xl font-semibold">Docs0</h3>
        </Link>
      </div>
      <SearchInput />
      <div className="flex items-center gap-x-2">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
};
