"use server";
import { cookies } from "next/headers";

interface Credentials {
  sheetURL: string;
  apiEndpoint: string;
  apiToken: string;
}
interface TransactionData {
  item: string;
  transactionType: string;
  transactionCategory: string;
  nominal: number;
}

export async function setCredentials(values: Credentials) {
  cookies().set("sheetURL", values.sheetURL, { maxAge: 8000000, secure: true });
  cookies().set("apiEndpoint", values.apiEndpoint, {
    maxAge: 8000000,
    secure: true,
  });
  cookies().set("apiToken", values.apiToken, { maxAge: 8000000, secure: true });
  return values;
}

export async function removeCredentials() {
  cookies().delete("sheetURL");
  cookies().delete("apiEndpoint");
  cookies().delete("apiToken");
  return true;
}

export async function getData() {
  const url = cookies().get("apiEndpoint")?.value as string | undefined;
  const token = cookies().get("apiToken")?.value as string | undefined;
  const options = { timeZone: "Asia/Jakarta" };
  const today = new Date().toLocaleDateString("en-GB", options);
  if (url && token) {
    const res = await fetch(url + `/search?Tanggal=${today}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const response = res.json();
    return response;
  }
}

export async function postData(values: TransactionData) {
  const url = cookies().get("apiEndpoint")?.value as string | undefined;
  const token = cookies().get("apiToken")?.value as string | undefined;
  const formData = new FormData();
  const options = { timeZone: "Asia/Jakarta" };
  formData.append("No", `=IF(ROW()=2; 1; INDEX(A:A; ROW()-1) + 1)`);
  formData.append("Tanggal", new Date().toLocaleDateString("en-GB", options));
  formData.append("Keterangan", values.item);
  formData.append("Sifat", values.transactionType);
  formData.append(values.transactionCategory, values.nominal.toString());
  formData.append(
    "Rekening",
    `=IF(ROW()=2;IF(INDEX(D:D; ROW())="Non Tunai"; INDEX(E:E; ROW()) - INDEX(F:F; ROW()); 0); IF(INDEX(D:D; ROW())="Non Tunai";INDEX(E:E; ROW()) - INDEX(F:F; ROW()) + INDEX(H:H; ROW()-1);IF(INDEX(D:D; ROW())="Tunai";INDEX(H:H; ROW()-1);IF(INDEX(D:D; ROW())="Tarik Tunai";INDEX(H:H; ROW()-1) - INDEX(G:G; ROW());INDEX(H:H; ROW()-1) + INDEX(G:G; ROW())))))`
  );
  formData.append(
    "Tunai",
    `=IF(ROW()=2;IF(INDEX(D:D; ROW())="Tunai"; INDEX(E:E; ROW()) - INDEX(F:F; ROW()); 0); IF(INDEX(D:D; ROW())="Tunai";INDEX(E:E; ROW()) - INDEX(F:F; ROW()) + INDEX(I:I; ROW()-1);IF(INDEX(D:D; ROW())="Non Tunai";INDEX(I:I; ROW()-1);IF(INDEX(D:D; ROW())="Tarik Tunai"; INDEX(I:I; ROW()-1) + INDEX(G:G; ROW());INDEX(I:I; ROW()-1) - INDEX(G:G; ROW())))))`
  );
  if (url && token) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return null;
    }
  }
}
