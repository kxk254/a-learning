"use client";
import React from "react";
import { ComponentCard } from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import { ArrowUpIcon } from "@/src/icons/index";
import styles from "./Input.module.css";

export const DropZone = () => {
  const onDrop = (acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
    // Handle file uploads here
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
      "image/svg+xml": [],
      "application/pdf": [],
    },
  });

  return (
    <ComponentCard title="Dropzone">
      <div className={styles.dropDiv}>
        <form
          {...getRootProps()}
          className={`${styles.dropForm} ${isDragActive ? styles.dropFormisActive : styles.dropFormInActive}`}
          id="demo-upload"
        >
          <input {...getInputProps()} />
          <div className={styles.dropDiv2}>
            <div className={styles.dropDiv3}>
              <div className={styles.dropDiv4}>
                <ArrowUpIcon className={styles.dropIcon} />
              </div>
            </div>
            <h4 className={styles.droph4}>
              {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
            </h4>
            <span className={styles.dropSpan}>
              Drag and drop your PDF, PNG, JPG, WebP, SVG images here or browse
            </span>
            <span className={styles.dropSpan2}>Browse File</span>
          </div>
        </form>
      </div>
    </ComponentCard>
  );
};
