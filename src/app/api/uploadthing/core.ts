import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// const handleAuth = () => {
//   const { userId } = getUserInfo() as IUserInfoType;

//   if (!userId) throw new Error("Unauthorized");
//   return { userId };
// };

export const ourFileRouter = {
  serviceImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  // serviceAttachment: f(["text", "image", "video", "audio", "pdf"])
  serviceAttachment: f(["image"])
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
