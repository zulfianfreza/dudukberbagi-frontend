import FormSignUp from "@/components/form-sign-up";
import Logo from "@/components/logo";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Masuk - dudukberbagi",
};

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className=" fixed flex h-screen w-full bg-gray-100">
      <Logo className=" absolute left-6 top-6 z-50 md:left-10 md:top-10" />
      <div className=" fixed h-full bg-[url('/images/Charity.png')] bg-cover bg-center brightness-[0.25] md:w-[398px] lg:w-[480px] xl:w-[542px]"></div>
      <div className=" hidden h-10  md:block md:w-[342px] lg:w-[424px] xl:w-[486px]"></div>
      <div className=" relative flex h-screen w-full flex-1 justify-center bg-white md:rounded-tl-[60px]">
        <div className=" flex w-full flex-col overflow-y-scroll py-24">
          <div className=" mx-auto w-full max-w-lg">
            <div className=" flex flex-col">
              <p className=" text-sm text-gray-800">
                Kami menantikan kedatanganmu.
              </p>
              <h1 className=" text-2xl font-semibold text-gray-800">
                Daftar ke dudukberbagi
              </h1>
            </div>
            <FormSignUp />
            <p className=" mt-8 text-center text-sm text-gray-800">
              Sudah punya akun?{" "}
              <Link href="/sign-in" className=" underline">
                Login disini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
