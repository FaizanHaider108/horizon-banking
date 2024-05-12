import Sidebar from "./components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = {firstName : "Faizan", lastName: "Haider"}
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={user}/>
      {children}
   </main>
  );
}
