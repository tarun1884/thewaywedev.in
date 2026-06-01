import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">404</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl">
          Lost in space.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The page you're looking for has drifted off the map. Let's get you back.
        </p>
        <Button asChild variant="accent" className="mt-6">
          <Link href="/">Take me home</Link>
        </Button>
      </div>
    </div>
  );
}
