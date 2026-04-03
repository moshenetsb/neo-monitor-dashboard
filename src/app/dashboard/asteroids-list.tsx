import type { Asteroid } from "@/types/asteroid";
import AsteroidCard from "./asteroid-card";

export default async function AsteroidsList({
  asteroids,
}: {
  asteroids: Asteroid[];
}) {
  console.log(asteroids);
  return (
    <div>
      {asteroids.map((a) => {
        console.log(a);
        return <AsteroidCard key={a.id} asteroid={a} />;
      })}
    </div>
  );
}
