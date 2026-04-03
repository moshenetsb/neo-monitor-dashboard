import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Asteroid } from "@/types/asteroid";

export default function AsteroidsTable({
  asteroids,
}: {
  asteroids: Asteroid[];
}) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold sm:p-2">Name</TableHead>
          <TableHead className="font-semibold sm:p-2">Approach Date</TableHead>
          <TableHead className="font-semibold sm:p-2">
            Miss Distance (km)
          </TableHead>
          <TableHead className="font-semibold sm:p-2">Diameter (km)</TableHead>
          <TableHead className="font-semibold sm:p-2">
            Velocity (km/h)
          </TableHead>
          <TableHead className="font-semibold sm:p-2">Hazardous</TableHead>
          <TableHead className="font-semibold sm:p-2">Danger Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {asteroids.map((a, index) => (
          <TableRow
            key={`${a.id}-${a.approach_date}-${index}`}
            className={a.danger_score > 500 ? "bg-red-100" : ""}
          >
            <TableCell>{a.name}</TableCell>
            <TableCell>{a.approach_date}</TableCell>
            <TableCell>
              {Math.round(
                parseFloat(a.close_approach_data[0].miss_distance.kilometers),
              )}
            </TableCell>
            <TableCell>
              {a.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                3,
              )}
            </TableCell>
            <TableCell>
              {Math.round(
                parseFloat(
                  a.close_approach_data[0].relative_velocity
                    .kilometers_per_hour,
                ),
              )}
            </TableCell>
            <TableCell>
              {a.is_potentially_hazardous_asteroid ? "Yes" : "No"}
            </TableCell>
            <TableCell>{a.danger_score.toFixed(3)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
