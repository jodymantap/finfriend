import { Box, Heading, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import styles from "../page.module.css";
import DataForm from "../_components/DataForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box style={{ alignItems: "center" }}>
        <DataForm />
      </Box>
    </main>
  );
}
