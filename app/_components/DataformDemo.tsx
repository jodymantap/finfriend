"use client";
import React, { useState } from "react";
import { Formik, Field, Form, FieldProps, type FormikHelpers } from "formik";
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
} from "@chakra-ui/react";
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

  return (
    <>
      <Formik
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
            mb="4"
            width="100%"
          >
            Save
          </Button>
          <Link onClick={() => setStep(2)} color="purple.500" fontSize="sm">
            See daily transactions <ArrowForwardIcon />
          </Link>
        </Form>
      </Formik>
    </>
  );
}
