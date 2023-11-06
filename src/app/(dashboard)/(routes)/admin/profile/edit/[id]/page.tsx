import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import ProfileUpdate from "@/components/profile/profile-update";
import { Backend_URL } from "@/lib/Constants";
import { User } from "@/lib/types";
import { getData } from "@/lib/utils";
import { getServerSession } from "next-auth";

const UpdateProfilePage = async () => {
  const session = await getServerAuthSession();
  const { data }: User = await getData(
    "me",
    session?.backendTokens.accessToken!,
    "GET"
  );
  return (
    <div className="w-11/12 mx-auto">
      <ProfileUpdate user={data} urlPath="/admin/profile" />
    </div>
  );
};

export default UpdateProfilePage;
