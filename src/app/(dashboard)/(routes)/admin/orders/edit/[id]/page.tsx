import { getServerSession } from "next-auth";

export default async function Page({ params }: any) {
  return (
    <div>
      <h1>I am admin order</h1>
    </div>
  );
}
