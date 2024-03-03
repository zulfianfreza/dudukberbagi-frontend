"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { cn, numberFormat } from "@/lib/utils";
import { CreateDonationSchema } from "@/lib/validation/donation";
import { getCampaignBySlug } from "@/services/campaign";
import { createDonation } from "@/services/donation";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Session } from "next-auth";
import Image from "next/image";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { DonatePageParams } from "./page";
import { BANK_LIST } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface DonateClientPageProps extends DonatePageParams {
  session: Session | null;
}

export default function DonateClientPage({
  params,
  session,
}: DonateClientPageProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      amount: 0,
      name: "",
      email: "",
      // noHandphone: "",
      isAnonym: false,
      bank_code: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().when([], () => {
        if (!session) {
          return Yup.string()
            .required("Nama tidak boleh kosong")
            .min(3, "Nama harus lebih dari 3 karakter");
        } else {
          return Yup.string().email();
        }
      }),
      email: Yup.string().when([], () => {
        if (!session) {
          return Yup.string().required("Email tidak boleh kosong").email();
        } else {
          return Yup.string().email();
        }
      }),
      amount: Yup.number().min(10000, "Donasi minimal 10.000"),
      isAnonyim: Yup.boolean(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const request: CreateDonationSchema = {
          campaign_id: data?.id ?? 0,
          amount: Number(values.amount),
          bank_code: values.bank_code,
          user: {
            user_id: session ? session.user.id : undefined,
            is_anonym: values.isAnonym,
            name: session ? session.user.name : values.name,
            email: session ? session.user.email : values.email,
          },
        };

        const res = await createDonation(request);

        toast("success");
        setSubmitting(false);
        router.push("/user/donation");
      } catch (error) {
        const err = error as Error;
        console.log(err.message);
      }
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["campaign", params.slug],
    queryFn: () => getCampaignBySlug({ slug: params.slug }),
  });
  return (
    <Container className=" mt-32">
      <div className=" mx-auto max-w-xl rounded-3xl">
        {isLoading ? (
          <div className="">
            <Skeleton className=" aspect-video w-full rounded-xl" />
            <div className=" mt-4 space-y-2">
              <Skeleton className=" h-5 w-full" />
              <Skeleton className=" h-5 w-full" />
              <Skeleton className=" h-4 w-full" />
            </div>
          </div>
        ) : (
          <div className="">
            <div className=" relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={data?.thumbnail ?? ""}
                fill
                alt=""
                className=" object-cover"
              />
            </div>

            <div className=" mt-4">
              <p className=" text-slate-800">
                Kamu mendukung{" "}
                <strong className=" font-semibold">{data?.title}</strong>
              </p>
              <p className=" text-sm text-slate-500">
                Donasi kamu akan masuk ke{" "}
                <strong className=" font-semibold">
                  {data?.organizer.name}
                </strong>
              </p>
            </div>
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className=" mt-8">
            <div className=" space-y-1">
              <Label>Nominal Donasi</Label>
              <div className="relative">
                <Input
                  className=" pl-10 text-slate-800"
                  type="text"
                  value={numberFormat(Number(formik.values.amount))}
                  onChange={(e) => {
                    const result = e.target.value.replace(/\D/g, "");

                    formik.setFieldValue("amount", result.toString());
                  }}
                  name="amount"
                  id="amount"
                />
                <Label className=" absolute left-4 top-1/2 -translate-y-1/2">
                  Rp
                </Label>
              </div>
              {formik.touched.amount && formik.errors.amount ? (
                <p className=" text-xs text-red-600">{formik.errors.amount}</p>
              ) : null}
            </div>
          </div>

          <div className=" mt-8">
            <h1 className=" text-lg font-semibold text-slate-800">
              Data Donatur
            </h1>
            {session ? (
              <div className=" mt-2">
                <h1 className=" font-semibold text-slate-800">
                  {session.user.name}
                </h1>
                <p className=" text-sm text-slate-500">{session.user.email}</p>
              </div>
            ) : (
              <div className=" mt-2">
                <div className="space-y-1">
                  <Label>Nama</Label>
                  <Input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    type="text"
                    name="name"
                    id="name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className=" text-xs text-red-600">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                <div className=" mt-2 grid grid-cols-2 gap-4">
                  <div className=" space-y-1">
                    <Label htmlFor="">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className=" text-xs text-red-600">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className=" space-y-1">
                    <Label htmlFor="">No Handphone</Label>
                    <Input type="text" />
                  </div>
                </div>
                <p className=" mt-1 text-xs font-light text-slate-500">
                  *No HP dan alamat email digunakan untuk notifikasi terkait
                  donasi ini dan tidak dipublikasikan.
                </p>
              </div>
            )}

            <div className=" mt-4 flex items-center justify-between">
              <p className=" text-sm text-slate-800">
                Sembunyikan nama(donasi sebagai anonim)
              </p>
              <Switch
                checked={formik.values.isAnonym}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("isAnonym", checked)
                }
                className=" data-[state=checked]:bg-violet-700"
              />
            </div>
          </div>

          <div className=" mt-8">
            <h1 className=" text-lg font-semibold text-slate-800">
              Metode Pembayaran
            </h1>
            <div className=" mt-4">
              <Label>Virtual Account</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {BANK_LIST.map((bank, i) => (
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("bank_code", bank.bank_code);
                    }}
                    key={i}
                    className={cn(" h-14 justify-start gap-4 font-normal", {
                      "border-pink-500":
                        formik.values.bank_code == bank.bank_code,
                    })}
                    variant="outline"
                  >
                    <div className=" relative aspect-video h-8">
                      <Image
                        src={`/images/${bank.image}`}
                        fill
                        alt={bank.bank_code}
                        className=" object-contain"
                      />
                    </div>
                    {/* <p>{bank.label}</p> */}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className=" mt-8">
            <Button
              className=" w-full"
              disabled={formik.isSubmitting}
              type="submit"
            >
              Donasi
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
