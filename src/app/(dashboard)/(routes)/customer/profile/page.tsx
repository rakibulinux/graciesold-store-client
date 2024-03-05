import { User2 } from "lucide-react";

import { cn, getData } from "@/lib/utils";
import { Heading } from "@/components/heading";
import Profile from "@/components/profile/profile";
import { User } from "@/types/types";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";

const ProfilePage = async () => {
  const session = await getServerAuthSession();
  const data: User = await getData(
    "users/me",
    session?.backendTokens?.accessToken!
  );

  return (
    <div>
      <Heading
        title="Profile"
        description="Our most advanced Profile model."
        icon={User2}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div></div>
        <div className="space-y-4 mt-4">
          <div
            className={cn(
              "p-8 w-full flex items-start gap-x-8 rounded-lg bg-white border border-black/10 bg-muted"
            )}
          >
            <Profile user={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
