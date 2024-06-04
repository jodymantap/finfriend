"use client";
import React from "react";
import { Flex, Link } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DataCard from "./DataCard";

export default function DataList() {
  return (
    <Flex gap="2" width="100%" direction="column">
      <Link mb="2" color="purple.500" fontSize="sm" href="/">
        <ArrowBackIcon /> Back
      </Link>
      <DataCard status="pemasukan" />
      <DataCard status="pengeluaran" />
      <DataCard status="konversi" />
      <DataCard status="konversi" />
      <DataCard status="pengeluaran" />
      <DataCard status="konversi" />
      <DataCard status="pemasukan" />
      <DataCard status="pemasukan" />
      <DataCard status="pemasukan" />
      <DataCard status="pengeluaran" />
      <DataCard status="pemasukan" />
      <DataCard status="pemasukan" />
      <DataCard status="konversi" />
      <DataCard status="konversi" />
    </Flex>
  );
}
