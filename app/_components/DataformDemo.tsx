"use client";
import React, { useRef, useState } from "react";
import {
  Formik,
  Field,
  Form,
  FieldProps,
  type FormikHelpers,
  FormikProps,
} from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  Box,
  Link,
  useToast,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IBoundingBox,
  IDetectedBarcode,
  IPoint,
  Scanner,
} from "@yudiel/react-qr-scanner";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import * as yup from "yup";
import { TransactionData } from "@/types";

export default function DataformDemo({
  setStep,
  setDemoTransactions,
  setDemoBalance,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDemoTransactions: React.Dispatch<React.SetStateAction<TransactionData[]>>;
  setDemoBalance: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formikRef = useRef<FormikProps<TransactionData>>(null);

  const validationSchema = yup.object({
    item: yup //Keterangan
      .string()
      .typeError("Item must be a string")
      .required("Item is required")
      .label("Item"),
    transactionType: yup //Sifat
      .string()
      .required("Transaction Type is required")
      .oneOf(
        ["Cash", "Non Cash", "Withdrawal", "Deposit"],
        "Invalid Transaction Type"
      )
      .label("Transaction Type"),
    transactionCategory: yup //income, outcome or conversion (conditional field)
      .string()
      .required("Transaction Category is required")
      .oneOf(
        ["Income", "Outcome", "Conversion"],
        "Invalid Transaction Category"
      )
      .label("Transaction Category"),
    nominal: yup //income, outcome or conversion (conditional field)
      .number()
      .typeError("Nominal must be a number")
      .required("Nominal is required")
      .label("Nominal"),
  });

  const toast = useToast();
  const postTransaction = (
    values: TransactionData,
    actions: FormikHelpers<TransactionData>
  ) => {
    setLoading(true);

    setTimeout(() => {
      setDemoTransactions((items) => [...items, values]);
      const numNominal = parseInt(values.nominal);
      if (values.transactionCategory === "Conversion") {
        if (values.transactionType === "Withdrawal") {
          setDemoBalance((item) => ({
            account: item.account - numNominal,
            cash: item.cash + numNominal,
          }));
        }

        if (values.transactionType === "Deposit") {
          setDemoBalance((item) => ({
            account: item.account + numNominal,
            cash: item.cash - numNominal,
          }));
        }
      }

      if (values.transactionCategory === "Income") {
        if (values.transactionType === "Cash") {
          setDemoBalance((item) => ({
            account: item.account,
            cash: item.cash + numNominal,
          }));
        } else {
          setDemoBalance((item) => ({
            account: item.account + numNominal,
            cash: item.cash,
          }));
        }
      }

      if (values.transactionCategory === "Outcome") {
        if (values.transactionType === "Cash") {
          setDemoBalance((item) => ({
            account: item.account,
            cash: item.cash - numNominal,
          }));
        } else {
          setDemoBalance((item) => ({
            account: item.account - numNominal,
            cash: item.cash,
          }));
        }
      }

      toast({
        title: "Success!",
        description: "Transaction added successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      actions.resetForm({
        values: {
          item: "",
          transactionType: "",
          transactionCategory: "",
          nominal: "0",
        },
      });

      setLoading(false);
    }, 1000);
  };

  const extractMerchantName = (qrData: string) => {
    const regex = /59(\d{2})([^5][^\d]{1,99})/;
    const match = qrData.match(regex);
    if (match) {
      const length = parseInt(match[1], 10);
      const merchantName = match[2].substring(0, length);
      return merchantName;
    }

    toast({
      title: "Process failed!",
      description: "Failed to get the merchant name.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    return null;
  };

  const fillForm = (result: IDetectedBarcode[]) => {
    const merchantName = extractMerchantName(result[0].rawValue);
    if (formikRef.current) {
      formikRef.current?.setFieldValue("item", merchantName);
      formikRef.current?.setFieldValue("transactionType", "Non Cash");
      formikRef.current?.setFieldValue("transactionCategory", "Outcome");
    }

    onClose();
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        validationSchema={validationSchema}
        initialValues={{
          item: "",
          transactionType: "",
          transactionCategory: "",
          nominal: "0",
        }}
        onSubmit={(values, actions) => {
          postTransaction(values, actions);
          actions.setSubmitting(false);
        }}
      >
        <Form>
          {/* <FormContainer> */}
          <Box mb="4">
            <Field name="item">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <FormControl isInvalid={!!(meta.touched && meta.error)}>
                    <FormLabel>Item</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter Item"
                      focusBorderColor="purple.600"
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </Field>
          </Box>
          <Box mb="4">
            <Field name="transactionType">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <FormControl isInvalid={!!(meta.touched && meta.error)}>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select {...field} placeholder="Select Transaction Type">
                      <option value="Cash">Cash</option>
                      <option value="Non Cash">Non Cash</option>
                      <option value="Withdrawal">Withdrawal</option>
                      <option value="Deposit">Deposit</option>
                    </Select>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </Field>
          </Box>
          <Box mb="4">
            <Field name="transactionCategory">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <FormControl isInvalid={!!(meta.touched && meta.error)}>
                    <FormLabel>Transaction Category</FormLabel>
                    <Select
                      {...field}
                      placeholder="Select Transaction Category"
                    >
                      <option value="Income">Income</option>
                      <option value="Outcome">Outcome</option>
                      <option value="Conversion">Conversion</option>
                    </Select>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </Field>
          </Box>
          <Box mb="4">
            <Field name="nominal">
              {({ field, form, meta }: FieldProps) => (
                <FormControl isInvalid={!!(meta.touched && meta.error)}>
                  <FormLabel>Nominal</FormLabel>
                  <NumberInput
                    {...field}
                    defaultValue={0}
                    onChange={(valueString) =>
                      form.setFieldValue(field.name, valueString)
                    }
                    key={form.initialValues.nominal}
                  >
                    <NumberInputField />
                  </NumberInput>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>
          <Button
            isLoading={loading}
            loadingText="Saving..."
            type="submit"
            colorScheme="purple"
            mt="4"
            mb="2"
            width="100%"
          >
            Save
          </Button>
          <Button
            isLoading={loading}
            onClick={onOpen}
            type="button"
            colorScheme="purple"
            mb="4"
            width="100%"
            variant="outline"
          >
            Scan QRIS{" "}
            <Tag ml="2" size="sm" variant="solid" colorScheme="purple">
              New
            </Tag>
          </Button>
          <Link onClick={() => setStep(2)} color="purple.500" fontSize="sm">
            See daily transactions <ArrowForwardIcon />
          </Link>
        </Form>
      </Formik>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent minHeight="500px">
          <ModalHeader>Scan QRIS</ModalHeader>
          <ModalBody>
            <Scanner onScan={(result) => fillForm(result)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
