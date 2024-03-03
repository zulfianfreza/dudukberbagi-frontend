"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string(),
  stock: yup.number(),
  variant: yup.string(),
});

type TSchema = yup.InferType<typeof schema>;

export default function TestStepperFormPage() {
  const formik = useFormik<TSchema>({
    initialValues: {
      name: "",
      stock: 0,
      variant: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Tab1 formik={formik} />
      <Tab2 formik={formik} />
      <Button type="submit" disabled={formik.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

type TTab1Props = {
  formik: FormikProps<Pick<TSchema, "name">>;
};

export function Tab1({ formik }: TTab1Props) {
  const { values, handleChange, touched, errors } = formik;
  return (
    <div className="">
      <Label htmlFor="name">Product Name</Label>
      <Input value={values.name} onChange={handleChange} name="name" />
      {touched.name && errors.name ? (
        <p className=" text-xs text-red-600">{errors.name}</p>
      ) : null}
    </div>
  );
}

type TTab2Props = {
  formik: FormikProps<Partial<TSchema>>;
};

export function Tab2({ formik }: TTab2Props) {
  const { values, handleChange, touched, errors } = formik;
  return (
    <div className="">
      <Label htmlFor="stock">Stock</Label>
      <Input value={values.stock} onChange={handleChange} name="stock" />
      {touched.stock && errors.stock ? (
        <p className=" text-xs text-red-600">{errors.stock}</p>
      ) : null}
    </div>
  );
}
