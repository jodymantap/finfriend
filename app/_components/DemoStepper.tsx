"use client";

import React, { useState } from "react";
import DataformDemo from "./DataformDemo";
import { TransactionData } from "@/types";

export default function DemoStepper() {
  const [step, setStep] = useState<number>(1);
  const [demoTransactions, setDemoTransactions] = useState<TransactionData[]>(
    []
  );

  return (
    <>
      {step === 1 ? (
        <DataformDemo
          setStep={setStep}
          setDemoTransactions={setDemoTransactions}
        />
      ) : (
        <pre>{JSON.stringify(demoTransactions)}</pre>
      )}
    </>
  );
}
