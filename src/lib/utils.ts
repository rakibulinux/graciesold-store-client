import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Backend_URL } from "./Constants";
import { productData } from "@/constants/data";
import { number } from "zod";
import { OrderBy } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function getUser(url: string, token: string): Promise<any> {
  let apiUrl = `${Backend_URL}/${url}`;
  if (!!token) {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { tags: ["collection"] },
      });

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
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
    const responseData: T = await response.json(); // Parse the response JSON
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
    return responseData; // Return the parsed data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for further handling or logging
  }
}

// `${Backend_URL}/${url}?page=${page}&perPage=${perPage}&searchValue=${searchValue}&where=email:${where}`,
// export async function getData<T>(
//   url: string,
//   token?: string,
//   page?: number,
//   perPage?: number,
//   searchValue?: string,
//   where?: any
// ): Promise<T> {
//   console.log(Backend_URL + url);
//   try {
//     const response = await fetch(
//       `${Backend_URL}/${url}?page=${page}&perPage=${perPage}&searchValue=${searchValue}&where=role:${where}`,
//       {
//         headers: {
//           "Content-Type": "application/json", // Adjust the content type as needed
//           authorization: `Bearer ${token}`,
//         },
//         next: { tags: ["collection"] },
//       }
//     );

//     // if (!response.ok) {
//     //   // Handle non-successful responses here (e.g., check for status code and throw an error)
//     //   throw new Error(`HTTP error! Status: ${response.status}`);
//     // }
//     const responseData = await response.json(); // Parse the response JSON
//     return responseData.data; // Return the parsed data
//   } catch (error) {
//     console.error("Error:", error);
//     throw error; // Rethrow the error for further handling or logging
//   }
// }

export async function getData(url: string, token?: string): Promise<any> {
  let apiUrl = `${Backend_URL}/${url}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { tags: ["collection"] },
    });

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function getQueryData({
  url,
  token,
  page,
  perPage,
  searchValue,
  where,
  orderBy,
}: {
  url: string;
  token?: string;
  page?: any;
  perPage?: any;
  searchValue?: string;
  where?: any;
  orderBy?: any;
}): Promise<any> {
  let apiUrl = `${Backend_URL}/${url}?`;

  if (where) {
    for (const key in where) {
      if (where.hasOwnProperty(key)) {
        const value =
          typeof where[key] === "object"
            ? JSON.stringify(where[key])
            : where[key];
        apiUrl += `where=${key}:${value}&`;
      }
    }
  }
  if (orderBy) {
    for (const key in orderBy) {
      if (orderBy.hasOwnProperty(key)) {
        const value =
          typeof orderBy[key] === "object"
            ? JSON.stringify(orderBy[key])
            : orderBy[key];
        apiUrl += `orderBy=${key}:${value}&`;
      }
    }
  }

  if (page) {
    apiUrl += `page=${page}&`;
  }

  if (perPage) {
    apiUrl += `perPage=${perPage}&`;
  }

  if (searchValue) {
    apiUrl += `searchValue=${searchValue}&`;
  }
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { tags: ["collection"] },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
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
    next: { tags: ["collection"] },
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
    ?.toLowerCase() // Convert to lowercase
    ?.replace(/\s+/g, "-") // Replace spaces with hyphens
    ?.replace(/[^a-z0-9-]/g, "") // Remove non-alphanumeric characters (except hyphens)
    ?.replace(/--+/g, "-"); // Replace consecutive hyphens with a single hyphen
}

export function slugToTitle(slug: string) {
  // Split the slug into words
  const words = slug.split("-");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the words back into a string
  const title = capitalizedWords.join(" ");

  return title;
}

export function parseOrderBy(sortString: string): OrderBy {
  const [field, order] = sortString.split(".");
  const orderObject: OrderBy = {};

  if (field && order) {
    orderObject[field] = order.toLowerCase() as "asc" | "desc";
  }

  return orderObject;
}
