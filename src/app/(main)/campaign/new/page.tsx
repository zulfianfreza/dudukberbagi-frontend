import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NewCampaignClientPage from "./client-page";

export default async function NewCampaignPage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return <NewCampaignClientPage />;
}
