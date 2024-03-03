import FormSignIn from "@/components/form-sign-in";
import Logo from "@/components/logo";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Masuk - dudukberbagi",
};

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className=" relative flex h-screen w-full bg-gray-100">
      <div className=" absolute h-full bg-[url('/images/sign-in-image.jpg')] bg-cover bg-center brightness-[0.50] md:w-[398px] lg:w-[480px] xl:w-[542px]"></div>
      <div className=" hidden md:block md:w-[342px] lg:w-[424px] xl:w-[486px]"></div>
      <div className=" relative flex h-full w-full flex-1 items-center justify-center bg-white px-6 py-16 pt-20 md:rounded-tl-[60px]">
        <Logo className=" absolute left-6 top-6 md:left-10 md:top-10" />
        <div className=" flex w-full max-w-xl flex-col">
          <div className=" flex flex-col">
            <p className=" text-sm text-gray-800">
              Kami menantikan kedatanganmu.
            </p>
            <h1 className=" text-2xl font-semibold text-gray-800">
              Masuk ke dudukberbagi
            </h1>
          </div>
          <FormSignIn />
          <p className=" mt-8 text-center text-sm text-gray-800">
            Belum punya akun?{" "}
            <Link href="/sign-up" className=" underline">
              Daftar disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
