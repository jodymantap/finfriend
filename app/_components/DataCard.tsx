"use client";

import React from "react";
import {
  Card,
  CardBody,
  Flex,
  Tag,
  Text,
  IconButton,
  Slide,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

export default function DataCard({
  transaction,
  selectedCard,
  setSelectedCard,
  editTransaction,
}: {
  transaction: Record<string, string>;
  selectedCard: Record<string, string>;
  setSelectedCard: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  editTransaction: () => void;
}) {
  const getStatus = (category: string) => {
    switch (category) {
      case "Pemasukan":
        return "green.400";
      case "Pengeluaran":
        return "red.400";
      case "Konversi":
        return "blue.400";
      default:
        break;
    }
  };

  const getSign = (category: string) => {
    switch (category) {
      case "Pemasukan":
        return "+";
      case "Pengeluaran":
        return "-";
      case "Konversi":
        return;
      default:
        break;
    }
  };

  const getType = (type: string) => {
    switch (type) {
      case "Tunai":
        return "Cash";
      case "Non Tunai":
        return "Non Cash";
      case "Tarik Tunai":
        return "Withdrawal";
      case "Setor Tunai":
        return "Deposit";
      default:
        break;
    }
  };

  const truncateString = (str: string) => {
    return str.length > 14 ? str.slice(0, 14) + "..." : str;
  };
  return (
    <>
      <Card
        cursor="pointer"
        onClick={() => setSelectedCard(transaction)}
        position="relative"
        overflow="hidden"
      >
        <CardBody>
          <Flex justify="space-between" align="center">
            <Flex
              gap="2"
              direction="column"
              justify="space-between"
              align="flex-start"
            >
              <Tag size="sm" variant="solid" colorScheme="purple">
                {getType(transaction.transactionType)}
              </Tag>
              <Text lineHeight="1" fontSize="sm" fontWeight="semibold">
                {truncateString(transaction.item)}
              </Text>
            </Flex>
            <Text
              lineHeight="1"
              fontSize="sm"
              color={getStatus(transaction.transactionCategory)}
            >
              {getSign(transaction.transactionCategory)} {transaction.nominal}
            </Text>
          </Flex>
        </CardBody>

        <Slide
          direction="right"
          in={transaction.id === selectedCard.id}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <div
            style={{
              backgroundColor: "#6B46C1",
              display: `${
                transaction.id === selectedCard.id ? "flex" : "none"
              }`,
              height: "100%",
              position: "absolute",
              top: 0,
              right: 0,
              padding: "0px 8px 0px 8px",
              alignItems: "center",
              borderTopRightRadius: "0.375rem",
              borderBottomRightRadius: "0.375rem",
            }}
          >
            <IconButton
              onClick={editTransaction}
              icon={<EditIcon />}
              aria-label="Edit"
              size="sm"
            />
          </div>
        </Slide>
      </Card>
    </>
  );
}
