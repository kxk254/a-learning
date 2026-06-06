import { SignInForm } from "@/src/components/auth/SignInForm";
import { MetaData } from "next";

export const metadata: Metadata = {
  title: "Soliton Core SignIn Page | Dashboard",
  description: "This is Soliton Core, management system",
};

export default function SignIn() {
  return <SignInForm />;
}
