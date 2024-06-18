import { Heading, Text, Button } from "@chakra-ui/react";
import styles from "../../page.module.css";
import Link from "next/link";

export default function Upgrade() {
  return (
    <main className={styles.main}>
      <Heading fontSize="24px" mb="4">
        Unlock Full Potential with Finfriend Premium 🚀
      </Heading>
      <Text mb="4">
        Some cool features like the integration with Google Sheets is only
        available on the full version.
      </Text>
      <Link href="https://linkedin.com/in/jodypratama" target="_blank" passHref>
        <Button colorScheme="purple">Contact Us</Button>
      </Link>
      <Link href="/demo" passHref style={{ marginLeft: "8px" }}>
        <Button colorScheme="purple" variant="outline">
          Back
        </Button>
      </Link>
    </main>
  );
}
