import AdminLayer from "@/components/adminLayer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" text-black bg-[#F3F4F6] grid gap-10 grid-cols-[1fr_4fr] min-h-screen p-4">
      <AdminLayer />
      <section className=" h-full overflow-y-auto ">
        <div className="h-full bg-[#d0d0d0] rounded-[10px] p-4">{children}</div>
      </section>
    </main>
  );
}
