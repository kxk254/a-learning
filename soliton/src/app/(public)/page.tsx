"use client";
import { Button } from "@/src/components/ui/button/Button";
import { Label } from "@/src/components/form/Label";
import { Checkbox } from "@/src/components/form/input/Checkbox";
import { Input } from "@/src/components/form/input/InputField";
import { Select } from "@/src/components/form/Select";
import { DatePicker } from "@/src/components/form/DatePicker";
import { TextArea } from "@/src/components/form/input/TextArea";
import { RadioSm } from "@/src/components/form/input/RadioSm";
import { FileInput } from "@/src/components/form/input/FileInput";
import { DropZone } from "@/src/components/form/input/DropZone";
import { ChartTab } from "@/src/components/common/ChartTab";
import styles from "./Page.module.css";
import { useState } from "react";

export default function Admin() {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");
  const [radio, setRadio] = useState(false);
  const [input, setInput] = useState("");
  return (
    <>
      <div className={styles.parent}>
        My App
        <Button className={styles.button} size="sm">
          Sign In{" "}
        </Button>
        <Input
          placeholder={"placeholder here ..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
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
        <TextArea value={text} onChange={setText} rows={5} hint="HINT" />
        <RadioSm
          id="apple"
          name="fruit"
          value="apple"
          label="Apple"
          checked={radio}
          onChange={setRadio}
        />
        <FileInput />
        <DropZone />
        <ChartTab />
      </div>
    </>
  );
}
