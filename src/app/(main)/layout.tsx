import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { getServerAuthSession } from "@/services/auth";
import { getCurrentUser } from "@/services/user";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const user = await getCurrentUser();

  return (
    <>
      <div className=" flex min-h-[100dvh] w-full flex-col">
        <Navbar user={user} />
        <div className=" flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
