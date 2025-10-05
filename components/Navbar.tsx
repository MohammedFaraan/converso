import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import ThemeToggle from "./ThemeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId } = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="flex items-center">
            <Image 
              src="/images/logo.svg" 
              alt="Converso logo" 
              height={38} 
              width={40} 
              className="dark:brightness-200"
            />
          </div>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6">
          {userId && <NavItems />}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SignedOut>
              <SignInButton>
                <button className="inline-flex h-9 items-center justify-center curxor-pointer rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
