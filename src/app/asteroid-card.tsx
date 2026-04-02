"use client";

import type { Asteroid } from "@/types/asteroid";

export default function AsteroidCard({ asteroid }: { asteroid: Asteroid }) {
  return (
    <div>
      <h2>{asteroid.name}</h2>
    </div>
  );
}
