"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
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
import { getData, setBalance } from "@/actions";
import DataCard from "./DataCard";
import NextLink from "next/link";

export default function DataList({
  balance,
}: {
  balance: Record<string, string>;
}) {
  const toast = useToast();
  const router = useRouter();
  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toEditData, setToEditData] = useState<Record<string, string>>();
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };

  const editTransaction = () => {
    if (toEditData) {
      router.push(
        `/?id=${toEditData.id}&item=${encodeURIComponent(
          toEditData.item
        )}&transactionType=${toEditData.transactionType}&transactionCategory=${
          toEditData.transactionCategory
        }&nominal=${toEditData.nominal}`
      );
    }
  };
  useEffect(() => {
    function transformData(
      data: Array<Record<string, string>>
    ): Array<Record<string, string>> {
      return data.map((item) => {
        let transactionCategory = "";
        let nominal = "";

        if (item.Pemasukan) {
          transactionCategory = "Pemasukan";
          nominal = item.Pemasukan;
        } else if (item.Pengeluaran) {
          transactionCategory = "Pengeluaran";
          nominal = item.Pengeluaran;
        } else if (item.Konversi) {
          transactionCategory = "Konversi";
          nominal = item.Konversi;
        }

        return {
          item: item.Keterangan,
          transactionType: item.Sifat,
          transactionCategory: transactionCategory,
          nominal: nominal,
          id: item.No,
        };
      });
    }

    async function getTransactionList() {
      try {
        const result = await getData();
        const transformedResult = transformData(result);
        setData(transformedResult.reverse());
        if (result?.length > 0) {
          setBalance(
            result[result.length - 1].Rekening,
            result[result.length - 1].Tunai
          );
        }
      } catch (error) {
        toast({
          title: "Fetching data failed!",
          description: "Failed to fetch data from the server.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
    getTransactionList();
  }, []);
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
            <Link as={NextLink} color="purple.500" fontSize="sm" href="/">
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
                      {balance.account}
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
                      {balance.cash}
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
            <DataCard
              transaction={transaction}
              key={transaction.id}
              selectedCard={toEditData}
              setSelectedCard={setToEditData}
              editTransaction={editTransaction}
            />
          ))
        ) : (
          <Text>No transaction for today.</Text>
        )}
      </Flex>
    </Box>
  );
}
