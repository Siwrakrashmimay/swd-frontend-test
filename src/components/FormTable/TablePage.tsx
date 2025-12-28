"use client";

import styles from "@/styles/form-table.module.scss";
import { useTranslation } from "react-i18next";
import TopRightControl from "../TopRightControl";
import PersonForm from "./PersonForm";

import dynamic from "next/dynamic";


export default function FormTablePage() {
    const { t } = useTranslation();


    const PersonTable = dynamic(() => import("./PersonTable"), {
        ssr: false,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBar}>
                <h2>{t("formTable")}</h2>
                <TopRightControl />
            </div>

            <div className={styles.formBox}>
                <PersonForm />
            </div>

            <div className={styles.tableBox}>
                <PersonTable />
            </div>
        </div>
    );
}
