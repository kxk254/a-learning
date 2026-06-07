"use client";
import { Button } from "@/src/components/ui/button/Button";
import { Label } from "@/src/components/form/Label";
import { Checkbox } from "@/src/components/form/input/Checkbox";
import { Input } from "@/src/components/form/input/InputField";
import { MultiSelect } from "@/src/components/form/MultiSelect";
import styles from "./Page.module.css";
import { useState } from "react";

export default function Admin() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className={styles.parent}>
        My App
        <Button className={styles.button} size="sm">
          Sign In{" "}
        </Button>
        <Input
          placeholder={"placeholder here ..."}
          hint={
            "ヒントを記載する項目　ここで入力の補助をすることができる限られた箇所で使用する予定"
          }
        />
        <Label>LABEL</Label>
        <Checkbox checked={checked} onChange={setChecked} disabled={false} />
        <MultiSelect />
      </div>
    </>
  );
}
