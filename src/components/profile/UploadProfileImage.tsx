import Image from "next/image";

import { Input } from "../ui/input";
import { Trash, UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Backend_URL } from "@/lib/Constants";

interface IImageType {
  selectedFile: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewImage: string | null;
  removeImage: () => void;
  profileImg: string | null;
}
const UploadProfileImage = ({
  handleFileChange,
  selectedFile,
  previewImage,
  removeImage,
  profileImg,
}: IImageType) => {
  return (
    <section className="container w-full mx-auto items-center">
      <div className="rounded-full bg-white shadow-md overflow-hidden">
        <div className="flex justify-center gap-2">
          {!selectedFile && (
            <div
              className={`p-4 ${
                selectedFile
                  ? "bg-gray-100"
                  : "bg-gray-200 border-dashed border-2 border-gray-400"
              } rounded-full w-40 h-40 overflow-hidden items-center text-center cursor-pointer`}
            >
              <Input
                id="upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <UploadCloud className="w-8 h-8 text-gray-700 mx-auto my-2" />
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                  Add Profile Image
                </h5>
              </label>
            </div>
          )}

          <div className="grid grid-cols-1 mb-4">
            {selectedFile && (
              <div className="relative">
                <div className="z-20 absolute top-6 right-5">
                  <Button
                    className="w-6 h-6"
                    type="button"
                    onClick={removeImage}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Avatar className="w-40 h-40">
                  <AvatarImage src={previewImage as string} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>

          <div>
            {!selectedFile && (
              <Avatar className="w-40 h-40">
                <Input
                  id="upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <AvatarImage src={Backend_URL + profileImg!} />
                <AvatarFallback>No Profile Picture</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadProfileImage;
