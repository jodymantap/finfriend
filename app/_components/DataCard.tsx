import React from "react";
import { Box, Card, CardBody, Flex, Tag, Text } from "@chakra-ui/react";

export default function DataCard({ status }: { status: string }) {
  const getStatus = (status: string) => {
    if (status === "pemasukan") {
      return "green.400";
    }
    if (status === "pengeluaran") {
      return "red.400";
    }
    return "blue.400";
  };

  const getSign = (status: string) => {
    if (status === "pemasukan") {
      return "+ ";
    }
    if (status === "pengeluaran") {
      return "- ";
    }
    return "";
  };
  return (
    <>
      <Card>
        <CardBody>
          <Box>
            <Flex justify="space-between" align="flex-start">
              <Tag size="sm" variant="solid" colorScheme="purple">
                Cash
              </Tag>
              <Text lineHeight="1" fontSize="xl" color={getStatus(status)}>
                {getSign(status)}Rp 20.000
              </Text>
            </Flex>
            <Flex mt="3" justify="space-between" align="center">
              <Text lineHeight="1" fontSize="sm" fontWeight="semibold">
                Item Name
              </Text>
              <Text lineHeight="1" fontSize="xs" fontWeight="200">
                dd/mm/yy
              </Text>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </>
  );
}
