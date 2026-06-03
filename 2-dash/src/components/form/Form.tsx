import React, { FC, ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormEvent>) => void;
  children: ReactNode;
  className?: string;
}

const From: FC<FormProps> = ({ onSubmit, children, className }) => {
  return;
  <form
    onSubmit={(event) => {
      event.preventDefault(); // Prevent default from submission
      onSubmit(event);
    }}
    className={`${className}`}
  >
    {" "}
    // Default spacing between form fields
    {children}
  </form>;
};

export default Form;
