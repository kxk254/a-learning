import React, { FormEvent } from "react";

interface FormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export const Form = ({ onSubmit, children, className }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(event);
      }}
      className={`${className}`}
    >
      {children}
    </form>
  );
};
