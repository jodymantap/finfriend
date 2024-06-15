"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import {
  Flex,
  Link,
  Skeleton,
  Stack,
  useToast,
  Text,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getData, setBalance } from "@/actions";
import DataCard from "./DataCard";

export default function DataList({
  balance,
}: {
  balance: Record<string, string>;
}) {
  const toast = useToast();
  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
          setBalance(result[0].Rekening, result[0].Tunai);
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
    <Flex gap="2" width="100%" direction="column">
      <Link mb="2" color="purple.500" fontSize="sm" href="/">
        <ArrowBackIcon /> Back
      </Link>
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
          <DataCard transaction={transaction} key={transaction.id} />
        ))
      ) : (
        <Text>No transaction for today.</Text>
      )}
    </Flex>
  );
}
