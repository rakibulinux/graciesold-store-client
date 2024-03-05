"use client";
import Image from "next/image";

import { Input } from "../ui/input";
import { Trash, UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

interface IImageType {
  selectedFiles: any;
  handleFileChange: any;
  previewImages: any;
  removeImage: any;
}

const UploadImages = ({
  handleFileChange,
  selectedFiles,
  previewImages,
  removeImage,
}: IImageType) => {
  return (
    <section className="container w-full mx-auto items-center">
      <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className={`p-4 ${
              selectedFiles.length > 0
                ? "bg-gray-100"
                : "bg-gray-200 border-dashed border-2 border-gray-400"
            } rounded-lg overflow-hidden items-center mx-auto text-center cursor-pointer`}
          >
            <Input
              id="upload"
              type="file"
              multiple
              maxLength={4}
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
                Add Product Images
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6 flex">
                Images up to 4MB, max 4
              </p>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
            {selectedFiles.length > 0 ? (
              previewImages.map(
                (url: string | StaticImport, index: Key | null | undefined) => (
                  <div key={index} className="relative">
                    <div className="z-10 absolute top-2 right-10">
                      <Button
                        type="button"
                        onClick={() => removeImage(url)}
                        variant="destructive"
                        size="icon"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <Image
                      src={url}
                      alt={`Image ${index}`}
                      className="max-h-48 rounded-lg mx-auto"
                      width={200}
                      height={200}
                    />
                  </div>
                )
              )
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-500">
                No image preview
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadImages;
