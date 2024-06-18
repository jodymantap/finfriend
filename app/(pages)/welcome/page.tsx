import styles from "../../page.module.css";
import {
  Box,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Image,
  Highlight,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Welcome() {
  return (
    <main className={styles.main}>
      <Box className="hero" mb="16">
        <Heading fontSize="36px" mb="4">
          <Highlight
            query={["Finfriend"]}
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "purple.500",
              color: "white",
            }}
          >
            Meet Finfriend, your personal finance friend &#x1F44B;
          </Highlight>
        </Heading>

        <Text fontWeight="400" mb="4">
          A simple yet powerful personal finance app. Let Finfriend helps you
          manage your money efforlessly!
        </Text>
        <Link href="/demo" passHref>
          <Button colorScheme="purple">Try Demo</Button>
        </Link>
        <Link style={{ marginLeft: "8px" }} href="/auth" passHref>
          <Button colorScheme="purple" variant="outline">
            Log In
          </Button>
        </Link>
      </Box>

      <Box className="feature">
        <Heading size="md" mb="4">
          Why be friends with us?
        </Heading>
        <Text mb="4" fontWeight="400">
          Join our circle and unlock these awesome features. One-time payment
          for lifetime friendship!
        </Text>
        <Image src="mockup.png" borderRadius="10" alt="App Mockup" />
        <Card mt="4">
          <CardBody>
            <Heading size="sm">Easy Transaction Management</Heading>
            <Text fontWeight="400" pt="2">
              Quickly add your transactions and categorize them as cash,
              non-cash, withdrawal, or cash deposit. Finfriend helps you keep
              everything organized and accessible.
            </Text>
          </CardBody>
        </Card>
        <Card mt="4">
          <CardBody>
            <Heading size="sm">Balance Differentiation</Heading>
            <Text fontWeight="400" pt="2">
              Easily differentiate between your cash balance and bank account
              balance. Finfriend keeps track of both, giving you a comprehensive
              view of your financial status.
            </Text>
          </CardBody>
        </Card>
        <Card mt="4">
          <CardBody>
            <Heading size="sm">Real-Time Google Sheets Sync</Heading>
            <Text fontWeight="400" pt="2">
              Say goodbye to manual exports. Finfriend automatically syncs your
              financial data with Google Sheets in real-time, ensuring you
              always have the most current information. This integration allows
              you to access and analyze your data from anywhere, at any time.
            </Text>
          </CardBody>
        </Card>
      </Box>
    </main>
  );
}
