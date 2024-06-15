import React from "react";
import styles from "../../page.module.css";
import DataList from "@/app/_components/DataList";
import { useServerCookies } from "@/utils/useServerCookies";

export default async function Recent() {
  const cookies = await useServerCookies();
  const balance: Record<string, string> = {
    account: cookies.accountBalance,
    cash: cookies.cashBalance,
  };
  return (
    <main className={styles.main}>
      <DataList balance={balance} />
    </main>
  );
}
