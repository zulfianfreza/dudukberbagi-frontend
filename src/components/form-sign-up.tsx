"use client";

import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axiosInstance from "@/lib/axios-instance";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/services/auth";
import { RegisterSchema } from "@/lib/validation/auth";

export default function FormSignUp() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "Natanael",
      email: "natanael@gmail.com",
      password: "natanael",
    },
    onSubmit: async (values) => {
      try {
        const data: RegisterSchema = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        const res = await register(data);

        router.push("/sign-in");
        toast.success("success");
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="mt-8 flex flex-col">
      <form onSubmit={formik.handleSubmit}>
        <div className=" space-y-1">
          <Label>Name</Label>
          <Input
            id="name"
            type="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className=" mt-2 space-y-1">
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
          Daftar
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
