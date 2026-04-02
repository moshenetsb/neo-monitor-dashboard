"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <Alert
        variant="destructive"
        className="max-w-md flex flex-col items-center gap-4 p-6"
      >
        <AlertTitle className="text-xl sm:text-3xl text-center font-bold">
          <h1>Something went wrong!</h1>
        </AlertTitle>
        <AlertDescription className="text-lg text-center text-muted-foreground">
          {error.message}
        </AlertDescription>
      </Alert>
    </div>
  );
}
