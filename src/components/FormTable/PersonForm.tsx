"use client";

import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    DatePicker,
    Row,
    Col,
    Modal
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPerson, clearEditingPerson, updatePerson } from "@/store/personSlice";
import { Person } from "@/types/person";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import CitizenIdRow from "./CitizenID";
import FormLabel from "./FormLabel";
import { RootState } from "@/store";
import { useState } from "react";
import FlagTH from "@/icons/FlagTH";
import FlagUS from "@/icons/FlagUS";

export default function PersonForm() {
    const [formKey, setFormKey] = useState(0);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const editingPerson = useSelector(
        (state: RootState) => state.person.editingPerson
    );

    const handleReset = () => {
        dispatch(clearEditingPerson());
        setFormKey(k => k + 1);
    };

    const onFinish = (values: Person) => {
        if (editingPerson) {
            dispatch(
                updatePerson({
                    ...editingPerson,
                    ...values,
                    birthday: dayjs(values.birthday).format("YYYY-MM-DD"),
                })
            );

            Modal.success({
                title: t("modal.update_success_title"),
                content: t("modal.update_success_content"),
                okText: t("modal.ok"),
            });
        } else {
            dispatch(
                addPerson({
                    ...values,
                    id: uuid(),
                    birthday: dayjs(values.birthday).format("YYYY-MM-DD"),
                })
            );

            Modal.success({
                title: t("modal.create_success_title"),
                content: t("modal.create_success_content"),
                okText: t("modal.ok"),
            });
        }

        dispatch(clearEditingPerson());
        setFormKey(k => k + 1);
    };

    return (
        <div className="form-box">
            <Form
                key={`${formKey}-${editingPerson?.id ?? "create"}`}
                initialValues={
                    editingPerson
                        ? {
                            ...editingPerson,
                            birthday: dayjs(editingPerson.birthday),
                        }
                        : undefined
                }
                onFinish={onFinish}
            >

                <Row gutter={16} align="middle">
                    <Col span={3}>
                        <FormLabel label={t("title")} required />
                    </Col>
                    <Col span={3}>
                        <Form.Item name="title" rules={[{ required: true }]} noStyle>
                            <Select
                                placeholder={`- ${t("title_placeholder")} -`}
                                style={{ width: "100%" }}
                                options={[
                                    { value: "Mr", label: t("title_mr") },
                                    { value: "Mrs", label: t("title_mrs") },
                                    { value: "Ms", label: t("title_ms") },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={3}>
                        <FormLabel label={t("firstname")} required />
                    </Col>
                    <Col span={6}>
                        <Form.Item name="firstname" rules={[{ required: true }]} noStyle>
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={3}>
                        <FormLabel label={t("lastname")} required />
                    </Col>
                    <Col span={6}>
                        <Form.Item name="lastname" rules={[{ required: true }]} noStyle>
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} align="middle" style={{ marginTop: 20 }}>
                    <Col span={3}>
                        <FormLabel label={t("birthday")} required />
                    </Col>
                    <Col span={4}>
                        <Form.Item name="birthday" rules={[{ required: true }]} noStyle>
                            <DatePicker
                                placeholder={`- ${t("date_placeholder")} -`}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={3}>
                        <FormLabel label={t("nationality")} required />
                    </Col>
                    <Col span={8}>
                        <Form.Item name="nationality" rules={[{ required: true }]} noStyle>
                            <Select
                                placeholder={`- ${t("please_select")} -`}
                                style={{ width: "100%" }}
                                options={[
                                    { value: "Thai", label: t("nationality_th") },
                                    { value: "American", label: t("nationality_us") },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} align="middle" style={{ marginTop: 20 }}>
                    <Col span={4}>
                        <FormLabel label={t("citizenId")} />
                    </Col>
                    <Col span={15}>
                        <CitizenIdRow />
                    </Col>
                </Row>

                <Row gutter={16} align="middle" style={{ marginTop: 20 }}>
                    <Col span={3}>
                        <FormLabel label={t("gender")} required />
                    </Col>
                    <Col span={21}>
                        <Form.Item name="gender" rules={[{ required: true }]} noStyle>
                            <Radio.Group>
                                <Radio value="Male">{t("male")}</Radio>
                                <Radio value="Female">{t("female")}</Radio>
                                <Radio value="Unsex">{t("unsex")}</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} align="middle" style={{ marginTop: 20 }}>
                    <Col span={4}>
                        <FormLabel label={t("mobilePhone")} required />
                    </Col>
                    <Col span={4}>
                        <Form.Item name="mobileCode" rules={[{ required: true }]} noStyle>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="- -"
                                optionLabelProp="label"
                                options={[
                                    {
                                        value: "+66",
                                        label: (
                                            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <FlagTH />
                                                +66
                                            </span>
                                        ),
                                    },
                                    {
                                        value: "+1",
                                        label: (
                                            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <FlagUS />
                                                +1
                                            </span>
                                        ),
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="mobile"
                            rules={[
                                { required: true, message: t("validation.mobile_required") },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: t("validation.mobile_number_only"),
                                },
                            ]}
                            noStyle
                        >
                            <Input
                                inputMode="numeric"
                                maxLength={10}
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, "");
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} align="middle" style={{ marginTop: 20 }}>
                    <Col span={3}>
                        <FormLabel label={t("passport")} />
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="passport"
                            rules={[
                                {
                                    pattern: /^[0-9]*$/,
                                    message: t("validation.passport_number_only"),
                                },
                            ]}
                            noStyle
                        >
                            <Input
                                inputMode="numeric"
                                // maxLength={9}
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, "");
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} align="middle" style={{ marginTop: 20 }}>
                    <Col span={4}>
                        <FormLabel label={t("salary")} required />
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="salary"
                            rules={[
                                { required: true, message: t("validation.salary_required") },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: t("validation.salary_number_only"),
                                },
                            ]}
                            noStyle
                        >
                            <Input
                                inputMode="numeric"
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, "");
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="end" gutter={16} style={{ marginTop: 24 }}>
                    <Col>
                        <Button onClick={handleReset}>
                            {t("reset")}
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" htmlType="submit">
                            {editingPerson ? t("update") : t("submit")}
                        </Button>
                    </Col>
                </Row>

            </Form>
        </div>
    );
}
