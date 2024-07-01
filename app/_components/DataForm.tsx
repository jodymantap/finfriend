"use client";
import { useState, useRef } from "react";
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
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Link,
  useToast,
} from "@chakra-ui/react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import * as yup from "yup";
import { postData } from "../../actions";
import { TransactionData } from "@/types";
import NextLink from "next/link";

export default function DataForm() {
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
          nominal: "0",
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
      formikRef.current?.setFieldValue("transactionType", "Non Tunai");
      formikRef.current?.setFieldValue("transactionCategory", "Pengeluaran");
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
          <Link as={NextLink} color="purple.500" fontSize="sm" href="/recent">
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
