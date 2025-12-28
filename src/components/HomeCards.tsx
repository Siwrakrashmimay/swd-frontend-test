"use client";

import { Card, Row, Col, Select } from "antd";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function HomeCards() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isThai = i18n.language === "th";

  return (
    <div className="home-bg">
      <div className="lang-switch">
        <Select
          value={i18n.language}
          onChange={(lng) => i18n.changeLanguage(lng)}
          options={[
            {
              value: "th",
              label: isThai ? "ภาษาไทย" : "TH",
            },
            {
              value: "en",
              label: isThai ? "ภาษาอังกฤษ" : "EN",
            },
          ]}
        />
      </div>

      <Row
        gutter={16}
        justify="center"
        align="middle"
        style={{ width: "100%" }}
      >
        <Col>
          <Card className="controlCard" onClick={() => router.push("/test1")}>
            <h3>{t("test1")}</h3>
            <p>{t("layoutStyle")}</p>
          </Card>
        </Col>

        <Col>
          < Card className="controlCard">
            <h3>{t("test2")}</h3>
            <p>{t("connectApi")}</p>
          </Card>
        </Col>

        <Col>
          <Card className="controlCard" onClick={() => router.push("/test3")}>
            <h3>{t("test3")}</h3>
            <p>{t("formTable")}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
