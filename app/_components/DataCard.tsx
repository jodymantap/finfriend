import React from "react";
import { Card, CardBody, Flex, Tag, Text } from "@chakra-ui/react";

export default function DataCard({
  transaction,
}: {
  transaction: Record<string, string>;
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
      <Card>
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
              {getSign(transaction.transactionCategory)}Rp 5.000.000
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
