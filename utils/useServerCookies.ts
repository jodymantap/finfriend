// utils/useServerCookies.js
import { cookies } from "next/headers";

export async function useServerCookies() {
  const sheetURL = cookies().get("sheetURL")?.value || "";
  const apiEndpoint = cookies().get("apiEndpoint")?.value || "";
  const apiToken = cookies().get("apiToken")?.value || "";
  return { sheetURL, apiEndpoint, apiToken };
}
