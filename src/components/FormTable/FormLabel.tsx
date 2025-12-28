import styles from "@/styles/form-table.module.scss";

interface FormLabelProps {
  label: string;
  required?: boolean;
}

export default function FormLabel({
  label,
  required = false,
}: FormLabelProps) {
  return (
    <label className={styles.formLabel}>
      {required && <span className={styles.required}>*</span>}
      {label}:
    </label>
  );
}
