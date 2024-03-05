import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "../auth/[...nextauth]/route";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("You Are unauthorized to upload images");
  return { userId };
};

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  // profileAttachment: f(["text", "image", "video", "audio", "pdf"])
  profileAttachment: f(["image"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "32MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
