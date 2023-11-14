import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Backend_URL } from "./Constants";
import { productData } from "@/constants/data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function postData<T>(
  url: string,
  data: Record<string, any>,

  token?: string
): Promise<T> {
  try {
    const response = await fetch(`${Backend_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);
    const responseData: T = await response.json(); // Parse the response JSON
    console.log("responseData from utils", responseData);
    return responseData; // Return the parsed data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for further handling or logging
  }
}
export async function patchPutData<T>(
  url: string,
  id: string,
  data: Record<string, any>,
  method: "PATCH" | "PUT",
  token: string
): Promise<T> {
  try {
    const response = await fetch(`${Backend_URL}/${url}/${id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData: T = await response.json(); // Parse the response JSON
    console.log("responsePatchData from utils", responseData);
    return responseData; // Return the parsed data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for further handling or logging
  }
}
export async function deleteData<T>(
  url: string,
  id: string,
  token: string
): Promise<T> {
  try {
    const response = await fetch(`${Backend_URL}/${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData: T = await response.json(); // Parse the response JSON
    console.log("responsePatchData from utils", responseData);
    return responseData; // Return the parsed data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for further handling or logging
  }
}
export async function getData<T>(url: string, token?: string): Promise<T> {
  try {
    const response = await fetch(`${Backend_URL}/${url}/`, {
      headers: {
        "Content-Type": "application/json", // Adjust the content type as needed
        authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    // if (!response.ok) {
    //   // Handle non-successful responses here (e.g., check for status code and throw an error)
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const responseData: T = await response.json(); // Parse the response JSON
    return responseData; // Return the parsed data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for further handling or logging
  }
}

export const getAllData = async (url: string) => {
  const res = await fetch(`${Backend_URL}/${url}`, {
    next: { tags: ["collection"] },
  });
  const data = await res.json();
  return data.data;
};
export const getSingleData = async (url: string, id: string) => {
  const res = await fetch(`${Backend_URL}/${url}/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data.data;
};

export const calculatePercentage = (oldPrice: any, price: any) => {
  return !!parseFloat(price) && !!parseFloat(oldPrice)
    ? (100 - (oldPrice / price) * 100).toFixed(0)
    : 0;
};

export const getSingleProudct = (_id: number) => {
  const item = productData.find((product) => product._id === _id);
  return item;
};

export function convertToSlug(inputString: string) {
  return inputString
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove non-alphanumeric characters (except hyphens)
    .replace(/--+/g, "-"); // Replace consecutive hyphens with a single hyphen
}
