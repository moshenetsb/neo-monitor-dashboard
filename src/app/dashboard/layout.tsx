export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full flex-1 items-center font-sans">
      <main className="flex-col max-w-5xl justify-between px-4 flex gap-4 my-4 w-full">
        {children}
      </main>
    </div>
  );
}
