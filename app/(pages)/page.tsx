import styles from "../page.module.css";
import DataForm from "../_components/DataForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <DataForm />
    </main>
  );
}
