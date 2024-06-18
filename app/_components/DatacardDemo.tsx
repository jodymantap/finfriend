import React from "react";
import { Card, CardBody, Flex, Tag, Text } from "@chakra-ui/react";

export default function DatacardDemo({
  transaction,
}: {
  transaction: Record<string, string>;
}) {
  const getStatus = (category: string) => {
    switch (category) {
      case "Income":
        return "green.400";
      case "Outcome":
        return "red.400";
      case "Conversion":
        return "blue.400";
      default:
        break;
    }
  };

  const getSign = (category: string) => {
    switch (category) {
      case "Income":
        return "+";
      case "Outcome":
        return "-";
      case "Conversion":
        return;
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
                {transaction.transactionType}
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
      </Card>
    </>
  );
}
