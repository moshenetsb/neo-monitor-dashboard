export interface Asteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  approach_date: string;
  absolute_magnitude_h: number;
  //estimated_diameter: EstamatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  //TODO: add more fields
}
