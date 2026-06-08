"use client";
import { Checkbox } from "@/src/components/form/input/Checkbox";
import { Input } from "@/src/components/form/input/InputField";
import { Label } from "@/src/components/form/Label";
import { Button } from "@/src/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/src/icons/index";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./SignInForm.module.css";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  console.log("signButton class:", styles.signButton);

  return (
    <div className={styles.signDiv1}>
      <div className={styles.signDiv2}>
        <div className={styles.signDiv3}>
          <div className={styles.signDiv4}>
            <h1 className={styles.signH1}>Sign in</h1>
            <p className={styles.signP}>
              Enter your userID and password to sign in!
            </p>
          </div>
          <form>
            <div className={styles.signDivForm}>
              <div>
                <Label>
                  User Id<span className={styles.signDanger}>*</span>
                </Label>

                <Input placeholder="User Id" type="text" />
              </div>
              <div className={styles.signPasswordDiv}>
                <Label>
                  Password<span className={styles.signDanger}>*</span>
                </Label>
                <div className={styles.signRelative}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.signSpanEye}
                  >
                    {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                  </span>
                </div>
              </div>
              <div>
                <Button size="sm" className={styles.signButton}>
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
