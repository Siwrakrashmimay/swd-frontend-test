"use client";

import { Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import styles from "@/styles/layout-style.module.scss";

export default function TopRightControl() {
  const { i18n } = useTranslation();
  const router = useRouter();

  const isThai = i18n.language === "th";

  return (
    <div className={styles.topRightControl}>
      <Select
        size="small"
        value={i18n.language}
        onChange={(lng) => i18n.changeLanguage(lng)}
        options={[
          { value: "th", label: isThai ? "ภาษาไทย" : "TH" },
          { value: "en", label: isThai ? "ภาษาอังกฤษ" : "EN" },
        ]}
      />

      <Button
        size="small"
        type="default"
        onClick={() => router.push("/")}
      >
        ← Home
      </Button>
    </div>
  );
}
