export function Footer() {
  return (
    <footer className="w-full border-t mt-auto py-2 text-center text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()} NEOs Dashboard created by{" "}
        <a
          href="https://github.com/moshenetsb"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline"
        >
          moshenetsb
        </a>
      </p>
    </footer>
  );
}
