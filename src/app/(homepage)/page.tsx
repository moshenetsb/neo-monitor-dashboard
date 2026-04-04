"use client";
import { Footer } from "./footer";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Suspense>
      <div className="flex flex-col flex-1 items-center justify-center text-center gap-8 px-4">
        <div className="space-x-2 not-dark:**:text-blue-950">
          <h1 className="text-3xl sm:text-5xl font-bold">NEOs Dashboard</h1>
          <p className="text-lg">Monitor Near-Earth Objects in real time 🚀</p>
        </div>

        <Button
          onClick={() => router.push(`/dashboard?${searchParams.toString()}`)}
          className="text-lg px-4 py-6"
        >
          Go to Dashboard
        </Button>
      </div>
      <Footer />
    </Suspense>
  );
}
