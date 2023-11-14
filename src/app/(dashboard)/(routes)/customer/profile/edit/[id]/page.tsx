import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import ProfileUpdate from "@/components/profile/profile-update";
import { User } from "@/lib/types";
import { getData } from "@/lib/utils";

const UpdateProfilePage = async () => {
  const session = await getServerAuthSession();
  const { data }: User = await getData(
    "users/me",
    session?.backendTokens.accessToken!
  );
  return (
    <div className="w-11/12 mx-auto">
      <ProfileUpdate user={data} urlPath="/customer/profile" />
    </div>
  );
};

export default UpdateProfilePage;
