import React from "react";
import PayPage from "./payment-page";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <PayPage params={params} />
    </div>
  );
};

export default page;
