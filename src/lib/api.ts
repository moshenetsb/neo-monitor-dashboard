export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const API_KEY = process.env.NASA_API_KEY ?? "";

if (API_URL === "") {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL was not set in enviroment variables!",
  );
}

if (API_KEY === "") {
  throw new Error("API_KEY was not set in enviroment variables!");
}
