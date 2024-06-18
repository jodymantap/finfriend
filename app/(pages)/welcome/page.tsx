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
} from "@chakra-ui/react";
import Link from "next/link";

export default function Welcome() {
  return (
    <main className={styles.main}>
      <Box className="hero" mb="12">
        <Heading size="lg" mb="4">
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
        <Image src="mockup.png" borderRadius="10" alt="App Mockup" mb="4" />
        <Link href="/demo" passHref>
          <Button colorScheme="purple">Try Demo</Button>
        </Link>
      </Box>

      <Box className="feature">
        <Card>
          <CardBody>
            <Heading size="sm">Easy Transaction Management</Heading>
            <Text fontWeight="300" pt="2">
              Quickly add your transactions and categorize them as cash,
              non-cash, withdrawal, or cash deposit. Finfriend helps you keep
              everything organized and accessible.
            </Text>
          </CardBody>
        </Card>
        <Card mt="4">
          <CardBody>
            <Heading size="sm">Balance Differentiation</Heading>
            <Text fontWeight="300" pt="2">
              Easily differentiate between your cash balance and bank account
              balance. Finfriend keeps track of both, giving you a comprehensive
              view of your financial status.
            </Text>
          </CardBody>
        </Card>
        <Card mt="4">
          <CardBody>
            <Heading size="sm">Real-Time Google Sheets Sync</Heading>
            <Text fontWeight="300" pt="2">
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
