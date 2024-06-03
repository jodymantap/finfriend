import AuthForm from "@/app/_components/AuthForm";
import styles from "../../page.module.css";

export default function Auth() {
  return (
    <main className={styles.main} style={{ alignItems: "center" }}>
      <AuthForm />
    </main>
  );
}
