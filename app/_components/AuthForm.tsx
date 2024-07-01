"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, FieldProps } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  Box,
  useToast,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import * as yup from "yup";
import { setCredentials } from "../../actions";
import { Credentials } from "@/types";
import NextLink from "next/link";

export default function AuthForm() {
  const [isTokenHidden, toggleTokenHidden] = useState<boolean>(true);
  const validationSchema = yup.object({
    sheetURL: yup
      .string()
      .required("Google Sheet's URL is required")
      .label("Google Sheet's URL"),
    apiEndpoint: yup
      .string()
      .required("API's endpoint is required")
      .label("API's Endpoint"),
    apiToken: yup
      .string()
      .required("API Token is required")
      .matches(/^[a-zA-Z0-9]+$/, "Invalid API Token format")
      .label("API Token"),
  });
  const toast = useToast();
  const router = useRouter();

  const setCookies = async (values: Credentials) => {
    const res = await setCredentials(values);
    if (res) {
      router.push("/");
      return;
    }
    toast({
      title: "Login failed!",
      description: "Failed to set cookie.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ sheetURL: "", apiEndpoint: "", apiToken: "" }}
        onSubmit={(values, actions) => {
          setCookies(values);
          actions.setSubmitting(false);
        }}
      >
        <Form>
          {/* <FormContainer> */}
          <Box mb="4">
            <Field name="sheetURL">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <FormControl isInvalid={!!(meta.touched && meta.error)}>
                    <FormLabel>Google Sheet's URL</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter Google Sheet's URL"
                      focusBorderColor="purple.600"
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </Field>
          </Box>
          <Box mb="4">
            <Field name="apiEndpoint">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <FormControl isInvalid={!!(meta.touched && meta.error)}>
                    <FormLabel>API's Endpoint</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter API's Endpoint"
                      focusBorderColor="purple.600"
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </Field>
          </Box>
          <Box mb="4">
            <Field name="apiToken">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <FormControl isInvalid={!!(meta.touched && meta.error)}>
                    <FormLabel>API Token</FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        type={isTokenHidden ? "password" : "text"}
                        placeholder="Enter API token"
                        focusBorderColor="purple.600"
                      />
                      <InputRightElement>
                        <IconButton
                          bg="transparent"
                          onClick={() => toggleTokenHidden(!isTokenHidden)}
                          aria-label="Hide or show token"
                          icon={isTokenHidden ? <ViewIcon /> : <ViewOffIcon />}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </Field>
          </Box>
          <Button type="submit" colorScheme="purple" mt="4" mb="4" width="100%">
            Log In
          </Button>
          <Link as={NextLink} color="purple.500" fontSize="sm" href="/demo">
            Try the demo <ArrowForwardIcon />
          </Link>
        </Form>
      </Formik>
    </>
  );
}
