"use client";

import { Row, Col, Card } from "antd";
import { useTranslation } from "react-i18next";
import styles from "@/styles/layout-style.module.scss";
import TopRightControl from "../TopRightControl";

interface ControlBarProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMovePosition: () => void;
}

export default function ControlBar({
  onMoveLeft,
  onMoveRight,
  onMovePosition,
}: ControlBarProps) {
  const { t } = useTranslation();

  return (
    <>
       <TopRightControl />

    <div className={styles.title}>{t("layoutStyle")}</div>
      
          <div className={styles.title}>  </div>

      <Row gutter={16} justify="center" className={styles.controlRow}>
        <Col span={6}>
          <Card className={styles.controlCard} onClick={onMoveLeft}>
            <div className={styles.triangleLeft} />
            <div className={styles.controlLabel}>{t("moveShape")}</div>
          </Card>
        </Col>

        <Col span={12}>
          <Card className={styles.controlCard} onClick={onMovePosition}>
            <div style={{ display: "flex", gap: 24 }}>
              <div className={styles.triangleUp} />
              <div className={styles.triangleDown} />
            </div>
            <div className={styles.controlLabel}>{t("movePosition")}</div>
          </Card>
        </Col>

        <Col span={6}>
          <Card className={styles.controlCard} onClick={onMoveRight}>
            <div className={styles.triangleRight} />
            <div className={styles.controlLabel}>{t("moveShape")}</div>
          </Card>
        </Col>
      </Row>
    </>
  );
}