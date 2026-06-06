import { Button } from "@/src/components/ui/button/Button";
import { Label } from "@/src/components/form/Label";
import styles from "./Page.module.css";
export default function Admin() {
  return (
    <>
      <div className={styles.parent}>
        My App
        <Button className={styles.button} size="md">
          Sign In{" "}
        </Button>
        <Label>LABEL</Label>
      </div>
    </>
  );
}
