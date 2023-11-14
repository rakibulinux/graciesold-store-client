import { Backend_URL } from "@/lib/Constants";
import OrdersPage from "./order-page";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";

const getData = async (token: string) => {
  const res = await fetch(`${Backend_URL}/order`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }
  const data = await res.json();

  return data.data;
};

const page = async () => {
  const session = await getServerAuthSession();
  const data = await getData(session?.backendTokens?.accessToken!);
  console.log(data);
  return (
    <div>
      <OrdersPage data={data} />
    </div>
  );
};

export default page;
