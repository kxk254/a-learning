import SignInForm from "@/src/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | SolitonCore Next.js Dashboard Template",
  description: "This is Next.js Signin Page SolitonCore Dashboard Template",
};
export default function Sigin() {
  return <SignInForm />;
}
