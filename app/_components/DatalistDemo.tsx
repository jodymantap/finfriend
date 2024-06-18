"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import {
  Flex,
  Link,
  Skeleton,
  Stack,
  useToast,
  Text,
  Card,
  CardBody,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DatacardDemo from "./DatacardDemo";
import { TransactionData } from "@/types";
import { v4 as uuidv4 } from "uuid";

export default function DatalistDemo({
  balance,
  demoTransactions,
  setStep,
}: {
  balance: Record<string, number>;
  demoTransactions: TransactionData[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const [formattedBalance, setFormattedBalance] =
    useState<Record<string, string>>();
  const [loading, setLoading] = useState<boolean>(true);
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  useEffect(() => {
    function transformData(
      data: TransactionData[]
    ): Array<Record<string, string>> {
      return data.map((item) => {
        let nominal = parseInt(item.nominal);
        let formattedNominal = "Rp" + nominal.toLocaleString("id-ID");
        let id = uuidv4();

        return {
          item: item.item,
          transactionType: item.transactionType,
          transactionCategory: item.transactionCategory,
          nominal: formattedNominal,
          id: id,
        };
      });
    }

    function getTransactionList() {
      setLoading(true);

      setTimeout(() => {
        const transformedData = transformData(demoTransactions);
        setData(transformedData.reverse());

        setLoading(false);
      }, 1000);
    }

    getTransactionList();
  }, []);

  useEffect(() => {
    function formatBalance() {
      setFormattedBalance({
        account: "Rp" + balance.account.toLocaleString("id-ID"),
        cash: "Rp" + balance.cash.toLocaleString("id-ID"),
      });
    }
    formatBalance();
  }, [balance]);

  return (
    <Box height="65vh" position="relative">
      <Flex gap="2" width="100%" direction="column">
        <Box
          bgColor={bgColor[colorMode]}
          position="sticky"
          top="87px"
          zIndex="2"
        >
          <Box mb="4" mt="4">
            <Link onClick={() => setStep(1)} color="purple.500" fontSize="sm">
              <ArrowBackIcon /> Back
            </Link>
          </Box>
          <Skeleton
            isLoaded={!loading}
            startColor="purple.500"
            endColor="pink.500"
          >
            <Swiper
              scrollbar={{
                hide: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Scrollbar, Autoplay]}
              spaceBetween={10}
              style={{ width: "100%" }}
            >
              <SwiperSlide>
                <Card bgGradient="linear(to-r, purple.500, pink.500)">
                  <CardBody>
                    <Text color="white" fontWeight="300" fontSize="xs">
                      Account Balance
                    </Text>
                    <Text color="white" fontWeight="600" fontSize="xl">
                      {formattedBalance?.account || "0"}
                    </Text>
                  </CardBody>
                </Card>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <Card bgGradient="linear(to-r, purple.500, pink.500)">
                  <CardBody>
                    <Text color="white" fontWeight="300" fontSize="xs">
                      Cash Balance
                    </Text>
                    <Text color="white" fontWeight="600" fontSize="xl">
                      {formattedBalance?.cash || "0"}
                    </Text>
                  </CardBody>
                </Card>
              </SwiperSlide>
            </Swiper>
          </Skeleton>
        </Box>

        {loading ? (
          <Stack>
            <Skeleton height="82px"></Skeleton>
            <Skeleton height="82px"></Skeleton>
            <Skeleton height="82px"></Skeleton>
            <Skeleton height="82px"></Skeleton>
            <Skeleton height="82px"></Skeleton>
            <Skeleton height="82px"></Skeleton>
          </Stack>
        ) : data && data.length > 0 ? (
          data?.map((transaction) => (
            <DatacardDemo transaction={transaction} key={transaction.id} />
          ))
        ) : (
          <Text>No transaction for today.</Text>
        )}
      </Flex>
    </Box>
  );
}
