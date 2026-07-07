import { LoadingSpinnerIcon } from "@/src/icons/index";
import styles from "./LoadingSpinner.module.css";

export function LoadingSpinner() {
  return (
    <div className={styles.div}>
      <LoadingSpinnerIcon className={styles.icon} />
      <span>Loading...</span>
    </div>
  );
}
