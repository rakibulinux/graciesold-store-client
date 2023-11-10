import { authOptions } from "@/app/lib/AuthOptions";
import ServiceDetails from "@/components/service/service-details";
import { getServerSession } from "next-auth";

export default async function Page({ params }: any) {
  const session: any = await getServerSession(authOptions);
  return (
    <>
      <ServiceDetails session={session} params={params} />
    </>
  );
}
