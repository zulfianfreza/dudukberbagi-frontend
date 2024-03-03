"use client";

import TiptapEditor from "@/components/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deleteUserImage, updateUser } from "@/services/user";
import { BaseResponse } from "@/types";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Profile } from "iconsax-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProfileClientPageProps {
  user: User;
}

export default function ProfileClientPage({ user }: ProfileClientPageProps) {
  const [about, setAbout] = useState<string>(user.about);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [name, setName] = useState<string>(user.name);
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      if (e.target.files[0].size > 1e6) {
        toast.error("Ukuran gambar harus kurang dari 1MB");
        return;
      }
      setImage(e.target.files[0]);
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleUploadImage = () => {
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    updateImageMutate(formData);
  };

  const { mutate: updateImageMutate, isPending: updateImagePending } =
    useMutation({
      mutationKey: ["user", user.id, "updateImage"],
      mutationFn: async (formData: FormData) => {
        const { data } = await axios.patch<BaseResponse<User>>(
          "http://localhost:8000/api/v1/user/image",
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
      onSuccess: () => {
        setImage(undefined);
        toast.success("success");
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const handleDeleteImage = () => {
    deleteImageMutate();
  };

  const { mutate: deleteImageMutate, isPending: deleteImagePending } =
    useMutation({
      mutationKey: ["user", user.id, "deleteImage"],
      mutationFn: deleteUserImage,
      onSuccess: () => {
        toast.success("success");
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { mutate: updateUserMutate, isPending: updateUserPending } =
    useMutation({
      mutationKey: ["user", user.id, "updateUser"],
      mutationFn: updateUser,
      onSuccess: () => {
        toast.success("success");
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const handleUpdateUser = () => {
    updateUserMutate({ name, about });
  };

  return (
    <div className="flex">
      <div className=" mt-4 flex-1">
        <div className="flex items-center gap-4">
          <div className=" w-32">
            <div className=" space-y-1">
              {/* <Label>Foto Profil</Label> */}
              {image ? (
                <div className=" relative aspect-square w-full overflow-hidden rounded-full">
                  <Image
                    src={URL.createObjectURL(image)}
                    fill
                    alt=""
                    className=" object-cover"
                  />
                </div>
              ) : user.image == "" ? (
                <div className=" flex aspect-square w-full items-center justify-center rounded-full bg-slate-100">
                  <Profile
                    className=" text-slate-500"
                    variant="Bold"
                    size={96}
                  />
                </div>
              ) : (
                <div className=" relative aspect-square w-full overflow-hidden rounded-full">
                  <Image
                    src={user.image}
                    fill
                    alt={user.name}
                    className=" object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex w-48 flex-col gap-4">
            {user.image == "" || isUpdate ? (
              <>
                {image ? (
                  <>
                    <Button
                      variant="secondary"
                      className=" h-10 rounded-full"
                      onClick={() => {
                        setImage(undefined);
                        setIsUpdate(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      name=""
                      id=""
                      className=" text-sm"
                      onChange={handleChangeImage}
                    />
                    <Label className=" text-xs font-normal text-slate-500">
                      Maksimal ukuran 1MB
                    </Label>
                  </div>
                )}
                <Button
                  className=" h-10 rounded-full bg-slate-800 hover:bg-slate-800/90"
                  // variant="secondary"
                  disabled={updateImagePending}
                  onClick={handleUploadImage}
                >
                  {updateImagePending ? "Uploading..." : "Upload Sekarang"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  className=" h-10 rounded-full"
                  variant="secondary"
                  onClick={handleDeleteImage}
                >
                  {deleteImagePending ? "Deleting..." : "Hapus"}
                </Button>
                <Button
                  className=" h-10 rounded-full"
                  onClick={() => setIsUpdate(true)}
                >
                  Ganti
                </Button>
              </>
            )}
          </div>
        </div>
        <div className=" mt-4 space-y-1">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className=" mt-4 space-y-1">
          <Label>Email</Label>
          <Input disabled value={user.email} />
        </div>
        <div className=" mt-4 space-y-1">
          <Label>Tentang</Label>
          {/* <TiptapEditor setValue={setAbout} value={about} /> */}
          <Textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={5}
          />
        </div>
        <div className=" mt-8 flex justify-end">
          <Button className=" h-10 rounded-full" onClick={handleUpdateUser}>
            Simpan
          </Button>
        </div>
      </div>

      {/* <div className=" w-56"></div> */}
    </div>
  );
}
