"use server";

import { Backend_URL } from "./Constants";

export const getNewAccessToken = async (token: string) => {
  try {
    const res = await fetch(`${Backend_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
