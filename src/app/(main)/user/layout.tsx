import Container from "@/components/container";
import UserSidebar from "@/components/user/user-sidebar";
import { getInitialName } from "@/lib/utils";
import { getServerAuthSession } from "@/services/auth";
import { GalleryEdit } from "iconsax-react";
import { redirect } from "next/navigation";
import { LuPencil, LuPencilLine } from "react-icons/lu";

interface UserLayourProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: UserLayourProps) {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <Container className=" mt-32">
      {/* <div className=" rounded-xl border p-6">
        <div className=" flex gap-4">
          <div className=" relative">
            <div className=" flex aspect-square w-12 items-center justify-center rounded-full bg-sky-400">
              <span className=" text-white">
                {getInitialName(session.user.name)}
              </span>
            </div>
            <div className=" absolute bottom-0 right-0 flex aspect-square w-4 items-center justify-center rounded-full bg-pink-500 ring-2 ring-white">
              <GalleryEdit size={8} className=" text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className=" font-semibold text-slate-800">
                {session.user.name}
              </h1>
              <LuPencilLine />
            </div>
            <p className=" text-sm text-slate-500">Bio</p>
          </div>
        </div>
      </div> */}
      <div className=" mt-8 flex items-start gap-16">
        <UserSidebar />
        <div className=" flex-1">{children}</div>
      </div>
    </Container>
  );
}
