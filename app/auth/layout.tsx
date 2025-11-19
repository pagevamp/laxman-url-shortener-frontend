export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden ">
      <div className="grow md:overflow-y-hidden">{children}</div>
    </div>
  );
}