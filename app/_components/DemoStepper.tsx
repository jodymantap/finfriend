"use client";

import React, { useState } from "react";
import DataformDemo from "./DataformDemo";
import { TransactionData } from "@/types";
import DatalistDemo from "./DatalistDemo";

export default function DemoStepper() {
  const [step, setStep] = useState<number>(1);
  const [demoTransactions, setDemoTransactions] = useState<TransactionData[]>([
    {
      item: "Monthly Salary",
      transactionType: "Non Cash",
      transactionCategory: "Income",
      nominal: "10000000",
    },
  ]);
  const [demoBalance, setDemoBalance] = useState<Record<string, number>>({
    account: 10000000,
    cash: 200000,
  });

  return (
    <>
      {step === 1 ? (
        <DataformDemo
          setStep={setStep}
          setDemoTransactions={setDemoTransactions}
          setDemoBalance={setDemoBalance}
        />
      ) : (
        <DatalistDemo
          balance={demoBalance}
          demoTransactions={demoTransactions}
          setStep={setStep}
        />
      )}
    </>
  );
}
