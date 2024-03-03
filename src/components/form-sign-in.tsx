"use client";

import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function FormSignIn() {
  const formik = useFormik({
    initialValues: {
      email: "adamberriz@gmail.com",
      password: "adamberriz",
    },
    onSubmit: async (values) => {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
      });
    },
  });

  return (
    <div className="mt-8 flex flex-col">
      <form onSubmit={formik.handleSubmit}>
        <div className=" space-y-1">
          <Label>Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className=" mt-2 space-y-1">
          <Label>Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className=" mt-4">
          <p className=" text-sm text-gray-800 underline">Lupa password?</p>
        </div>
        <Button className=" mt-4 w-full" type="submit">
          Masuk
        </Button>
      </form>
      <p className=" mt-4 text-center text-sm">atau</p>
      <div className=" mt-4 flex justify-center">
        <Button variant="outline" className=" w-full gap-2">
          <FcGoogle size={20} />
          Masuk dengan Google
        </Button>
      </div>
    </div>
  );
}
