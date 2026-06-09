import { SignInForm } from "@/src/components/auth/SignInForm";
import { MetaData } from "next";
import styles from "./Page.module.css";

export const metadata: Metadata = {
  title: "Soliton Core SignIn Page | Dashboard",
  description: "This is Soliton Core, management system",
};

export default function SignIn() {
  return (
    <div className={styles.mainDiv}>
      <SignInForm />
    </div>
  );
}
