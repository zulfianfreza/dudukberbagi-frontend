import { getCurrentUser } from "@/services/user";
import ProfileClientPage from "./client-page";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <div>
      <h1 className=" text-lg font-semibold text-slate-800">Profil Saya</h1>
      <ProfileClientPage user={user!} />
    </div>
  );
}
