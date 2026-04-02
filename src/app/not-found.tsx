"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function NotFound() {
  const searchParams = useSearchParams();

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <Alert className="max-w-md flex flex-col items-center gap-4 p-6">
        <AlertTitle className="text-4xl font-bold">404</AlertTitle>
        <AlertDescription className="text-lg text-muted-foreground text-center">
          Sorry, the page you are looking for does not exist.
        </AlertDescription>
        <Button
          onClick={() => redirect(`/?${searchParams.toString()}`)}
          className="text-lg px-4 py-6"
        >
          Go back home
        </Button>
      </Alert>
    </div>
  );
}
