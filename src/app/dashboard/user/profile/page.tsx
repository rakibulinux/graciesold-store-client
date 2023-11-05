import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async () => {
  const session = await getServerAuthSession();
  const response = await fetch(Backend_URL + `/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  console.log(user);

  return (
    <div className="m-2 border rounded shadow overflow-hidden">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
        User Profile
      </div>

      <div className="grid grid-cols-2  p-2 gap-2">
        <p className="p-2 text-slate-400">Name:</p>
        <p className="p-2 text-slate-950">{user?.data?.name}</p>
        <p className="p-2 text-slate-400">Email:</p>
        <p className="p-2 text-slate-950">{user?.data?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;