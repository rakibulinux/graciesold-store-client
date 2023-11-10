import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Backend_URL } from "./Constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function postData<T>(
  url: string,
  data: Record<string, any>,
  method: "PATCH" | "POST" | "DELETE" | "PUT",
  token?: string
): Promise<T> {
  try {
    const response = await fetch(`${Backend_URL}/${url}`, {
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
    console.log("responseData from utils", responseData);
    return responseData; // Return the parsed data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for further handling or logging
  }
}
export async function getData<T>(id: string, token: string): Promise<T> {
  try {
    const response = await fetch(`${Backend_URL}/users/${id}/`, {
      headers: {
        "Content-Type": "application/json", // Adjust the content type as needed
        authorization: `Bearer ${token}`,
      },
      next: { tags: ["profile"] },
    });

    if (!response.ok) {
      // Handle non-successful responses here (e.g., check for status code and throw an error)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: T = await response.json(); // Parse the response JSON
    return responseData; // Return the parsed data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for further handling or logging
  }
}
