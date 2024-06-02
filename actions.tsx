"use server";
import { cookies } from "next/headers";

interface Credentials {
  sheetURL: string;
  apiEndpoint: string;
  apiToken: string;
}

export async function setCredentials(userCredentials: Credentials) {
  cookies().set("sheetURL", userCredentials.sheetURL);
  cookies().set("apiEndpoint", userCredentials.apiEndpoint);
  cookies().set("apiToken", userCredentials.apiToken);
  return userCredentials;
}

export async function removeCredentials() {
  cookies().delete("sheetURL");
  cookies().delete("apiEndpoint");
  cookies().delete("apiToken");
  return true;
}
