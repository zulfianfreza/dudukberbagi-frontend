"use client";
import Container from "@/components/container";
import TiptapEditor from "@/components/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CATEGORY_LIST } from "@/lib/constants";
import { cn, numberFormat } from "@/lib/utils";
import {
  CreateCampaignSchema,
  createCampaignSchema,
} from "@/lib/validation/campaign";
import { BaseResponse } from "@/types";
import { Campaign } from "@/types/campaign";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { useFormik } from "formik";
import { Calendar1, GalleryAdd, GalleryEdit } from "iconsax-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { PiCaretUpDown } from "react-icons/pi";
import { RiCheckLine } from "react-icons/ri";
import * as Yup from "yup";

export default function NewCampaignClientPage() {
  const [open, setOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { data: session } = useSession();

  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formik = useFormik({
    initialValues: {
      title: "",
      story: "",
      category_id: "",
      goal_amount: 0,
      end_date: tomorrow,
      thumbnail: null,
    },
    validationSchema: createCampaignSchema,
    onSubmit: async (values) => {
      if (!values.thumbnail) {
        formik.setFieldError("thumbnail", "Thumbnail tidak boleh kosong");
        return;
      }
      const formData = new FormData();
      const endDate = values.end_date || new Date();
      formData.append("title", values.title);
      formData.append("story", values.story);
      formData.append("goal_amount", values.goal_amount.toString());
      formData.append("end_date", endDate.toISOString());
      formData.append("category_id", values.category_id);
      formData.append("thumbnail", values.thumbnail!);

      mutateAsync(formData);
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["campaign", "create"],
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post<BaseResponse<Campaign>>(
        "http://localhost:8000/api/v1/campaign/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.token}`,
          },
        },
      );

      return data.data;
    },
    onMutate: () => {
      formik.setSubmitting(true);
    },
    onSuccess: (data) => {
      toast.success("success");
      formik.setSubmitting(false);
      formik.resetForm();
      router.push(`/campaign/${data.slug}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChooseImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
      if (file.size > 5e6) {
        toast.error("ukuran image harus kurang dari 5MB");
        return false;
      }
      formik.setFieldValue("thumbnail", file);
    }
  };

  useEffect(() => {
    console.log("a");
  }, []);

  return (
    <Container className=" mt-32">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center justify-between">
          <h1 className=" text-3xl font-semibold text-slate-800">
            Buat Campaign
          </h1>
          <div className="flex flex-row-reverse gap-2">
            <Button type="submit" disabled={formik.isSubmitting}>
              Simpan
            </Button>
            <Button variant="secondary" onClick={() => router.back()}>
              Batal
            </Button>
          </div>
        </div>

        <div className=" mt-4 flex gap-8">
          <div className=" flex-1">
            <div className=" space-y-1">
              <Label htmlFor="title">Judul Campaign</Label>
              <Input
                value={formik.values.title}
                onChange={formik.handleChange}
                name="title"
                id="title"
                type="text"
              />
              {formik.touched.title && formik.errors.title ? (
                <p className=" text-xs text-red-600">{formik.errors.title}</p>
              ) : null}
            </div>
            <div className=" mt-4 space-y-1">
              <Label htmlFor="story">Cerita Penggalangan Dana</Label>
              <TiptapEditor
                setValue={(value) => {
                  formik.setFieldValue("story", value);
                }}
              />
              {formik.touched.story && formik.errors.story ? (
                <p className=" text-xs text-red-600">{formik.errors.story}</p>
              ) : null}
            </div>
          </div>

          <div className=" w-96">
            <div className=" space-y-1">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <input
                type="file"
                name="thumbnail"
                id=""
                className="hidden"
                ref={imageRef}
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleChangeImage}
              />
              {formik.values.thumbnail ? (
                <button
                  onClick={handleChooseImage}
                  type="button"
                  className=" group/thumbnail relative aspect-video w-full overflow-hidden rounded-xl"
                >
                  <Image
                    src={URL.createObjectURL(formik.values.thumbnail)}
                    fill
                    alt="thumbnail"
                    className=" object-cover"
                  />
                  <div className=" absolute top-0 hidden h-full w-full items-center justify-center bg-black/50 group-hover/thumbnail:flex">
                    <GalleryEdit className=" text-white" size={36} />
                  </div>
                </button>
              ) : (
                <button
                  onClick={handleChooseImage}
                  type="button"
                  className=" flex aspect-video w-full items-center justify-center rounded-xl border border-slate-200 shadow-sm"
                >
                  <GalleryAdd className=" text-slate-500" size={36} />
                </button>
              )}
              {formik.values.thumbnail}
              {formik.touched.thumbnail && formik.errors.thumbnail ? (
                <p className=" text-xs text-red-600">
                  {formik.errors.thumbnail}
                </p>
              ) : null}
            </div>

            <div className=" mt-4 space-y-1">
              <Label htmlFor="goal_amount">Target Donasi</Label>
              <Input
                type="text"
                name="goal_amount"
                value={numberFormat(Number(formik.values.goal_amount))}
                onChange={(e) => {
                  const result = e.target.value.replace(/\D/g, "");

                  formik.setFieldValue("goal_amount", result.toString());
                }}
              />
              {formik.touched.goal_amount && formik.errors.goal_amount ? (
                <p className=" text-xs text-red-600">
                  {formik.errors.goal_amount}
                </p>
              ) : null}
            </div>

            <div className=" mt-4 w-full space-y-1">
              <Label htmlFor="category">Kategori</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between font-normal"
                  >
                    {formik.values.category_id
                      ? CATEGORY_LIST.find(
                          (value) =>
                            value.id == Number(formik.values.category_id),
                        )?.label
                      : "Pilih Kategori"}
                    <PiCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" w-96 p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Pilih kategori..."
                      className="h-9"
                    />
                    <CommandEmpty>Tidak ada kategori.</CommandEmpty>
                    <CommandGroup>
                      {CATEGORY_LIST.map((value) => (
                        <CommandItem
                          className=" cursor-pointer"
                          key={value.id}
                          value={formik.values.category_id}
                          onSelect={() => {
                            formik.setFieldValue("category_id", value.id);
                            setOpen(false);
                          }}
                        >
                          {value.label}
                          <RiCheckLine
                            className={cn(
                              "ml-auto h-4 w-4",
                              Number(formik.values.category_id) === value.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {formik.touched.category_id && formik.errors.category_id ? (
                <p className=" text-xs text-red-600">
                  {formik.errors.category_id}
                </p>
              ) : null}
            </div>

            <div className=" mt-4 w-full space-y-1">
              <Label htmlFor="endDate">Tanggal Berakhir</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formik.values.end_date && "text-muted-foreground",
                    )}
                  >
                    <Calendar1 className="mr-2 h-4 w-4" />
                    {formik.values.end_date ? (
                      format(formik.values.end_date, "dd MMMM yyyy")
                    ) : (
                      <span>Pilih Tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formik.values.end_date || undefined}
                    onSelect={(date) => {
                      formik.setFieldValue("end_date", date);
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {/* {formik.touched.end_date && formik.errors.end_date ? (
                <p className=" text-xs text-red-600">
                  {formik.errors.end_date}
                </p>
              ) : null} */}
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
}
