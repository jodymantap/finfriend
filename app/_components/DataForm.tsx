"use client";
import { useState } from "react";
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
import { postData } from "../../actions";
import { TransactionData } from "@/types";
import NextLink from "next/link";

export default function DataForm() {
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
        ["Tunai", "Non Tunai", "Tarik Tunai", "Setor Tunai"],
        "Invalid Transaction Type"
      )
      .label("Transaction Type"),
    transactionCategory: yup //income, outcome or conversion (conditional field)
      .string()
      .required("Transaction Category is required")
      .oneOf(
        ["Pemasukan", "Pengeluaran", "Konversi"],
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
  const postTransaction = async (
    values: TransactionData,
    actions: FormikHelpers<TransactionData>
  ) => {
    setLoading(true);
    const res = await postData(values);
    if (res) {
      toast({
        title: "Success!",
        description: "Transaction added successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      actions.resetForm({
        values: {
          // Reset other form values here
          item: "",
          transactionType: "",
          transactionCategory: "",
          nominal: 0,
        },
      });
      setLoading(false);
      return;
    }
    toast({
      title: "Failed!",
      description: "Failed to add your transaction.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    setLoading(false);
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          item: "",
          transactionType: "",
          transactionCategory: "",
          nominal: 0,
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
                      <option value="Tunai">Cash</option>
                      <option value="Non Tunai">Non Cash</option>
                      <option value="Tarik Tunai">Withdrawal</option>
                      <option value="Setor Tunai">Deposit</option>
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
                      <option value="Pemasukan">Income</option>
                      <option value="Pengeluaran">Outcome</option>
                      <option value="Konversi">Conversion</option>
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
          <Link as={NextLink} color="purple.500" fontSize="sm" href="/recent">
            See daily transactions <ArrowForwardIcon />
          </Link>
        </Form>
      </Formik>
    </>
  );
}
