import PageBreadcrumb from "@/src/components/common/PageBreadCrumb";
import CheckboxComponents from "@/src/components/form/form-elements/CheckboxComponents";
import DefaultInputs from "@/src/components/form/form-elements/DefaultInputs";
import DropzoneComponent from "@/src/components/form/form-elements/DropZone";
import FileInputExample from "@/src/components/form/form-elements/FileInputExample";
import InputGroup from "@/src/components/form/form-elements/InputGroup";
import InputStates from "@/src/components/form/form-elements/InputStates";
import RadioButtons from "@/src/components/form/form-elements/RadioButtons";
import SelectInputs from "@/src/components/form/form-elements/SelectInputs";
import TextAreaInput from "@/src/components/form/form-elements/TextAreaInput";
import ToggleSwitch from "@/src/components/form/form-elements/ToggleSwitch";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Soliton Core",
  description: "Soliton Core Systems",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Form Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
