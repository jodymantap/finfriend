"use client";

import React from "react";
import { Card, CardBody, Flex, Tag, Text, Slide } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

export default function DataCard({
  transaction,
  selectedCard,
  setSelectedCard,
  editTransaction,
}: {
  transaction: Record<string, string>;
  selectedCard?: Record<string, string>;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<Record<string, string> | undefined>
  >;
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

  const handleCardClick = () => {
    setSelectedCard(
      transaction.id === selectedCard?.id ? undefined : transaction
    );
  };
  return (
    <>
      <Card
        onClick={() => handleCardClick()}
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
          in={transaction.id === selectedCard?.id}
          style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              display: `${
                transaction.id === selectedCard?.id ? "flex" : "none"
              }`,
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "flex-end",
              borderRadius: "0.375rem",
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                editTransaction();
              }}
              style={{
                backgroundColor: "#6B46C1",
                padding: "0px 24px 0px 24px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <EditIcon />
            </div>
          </div>
        </Slide>
      </Card>
    </>
  );
}
