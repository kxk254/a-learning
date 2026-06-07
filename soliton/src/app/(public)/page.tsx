"use client";
import { Button } from "@/src/components/ui/button/Button";
import { Label } from "@/src/components/form/Label";
import { Checkbox } from "@/src/components/form/input/Checkbox";
import { Input } from "@/src/components/form/input/InputField";
import { Select } from "@/src/components/form/Select";
import { DatePicker } from "@/src/components/form/DatePicker";
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
        <Input placeholder={"placeholder here ..."} />
        <Label>LABEL</Label>
        <Checkbox checked={checked} onChange={setChecked} disabled={false} />
        <Select
          options={[
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "orange", label: "Orange" },
          ]}
        />
        <DatePicker id="abc" />
      </div>
    </>
  );
}
