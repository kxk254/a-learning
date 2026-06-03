import SignUpForm from "@/src/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignUp Page | SolitonCore - Next.js Dashboard Template",
  description: "This is Next.js SignUp Page SolitonCore Dashboard Template",
};
export default function Signup() {
  return <SignUpForm />;
}
