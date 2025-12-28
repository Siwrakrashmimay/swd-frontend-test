"use client";

import { Table, Button, Checkbox, Pagination, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Gender, Person } from "@/types/person";
import { deleteMany, deletePerson, setEditingPerson } from "@/store/personSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PersonTable() {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.person.list);

    const { t } = useTranslation();

    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);

    const pageSize = 5;
    const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

    const columns: ColumnsType<Person> = [
        {
            title: t("table.name"),
            render: (_, r) => `${r.firstname} ${r.lastname}`,
        },
        {
            title: t("table.gender"),
            dataIndex: "gender",
            render: (value: Gender) => t(`gender_table.${value}`),
        },
        {
            title: t("table.mobile"),
            dataIndex: "mobile",
        },
        {
            title: t("table.nationality"),
            dataIndex: "nationality",
            render: (value: string) => t(`nationality_tabl.${value}`),
        },
        {
            title: t("table.manage"),
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => dispatch(setEditingPerson(record))}
                    >
                        {t("table.edit")}
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() =>
                            Modal.confirm({
                                title: t("modal.delete_confirm_title"),
                                content: t("modal.delete_confirm_single"),
                                okText: t("modal.delete"),
                                okType: "danger",
                                cancelText: t("modal.cancel"),
                                onOk: () => dispatch(deletePerson(record.id)),
                            })
                        }
                    >
                        {t("table.delete")}
                    </Button>
                </>
            ),
        },
    ];


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                    <Checkbox
                        checked={selectedRowKeys.length === data.length && data.length > 0}
                        onChange={e =>
                            setSelectedRowKeys(e.target.checked ? data.map(d => d.id) : [])
                        }
                    >
                        {t("table.select_all")}
                    </Checkbox>

                    <Button
                        danger
                        style={{ marginLeft: 12 }}
                        disabled={!selectedRowKeys.length}
                        onClick={() =>
                            Modal.confirm({
                                title: t("modal.delete_confirm_title"),
                                content: t("modal.delete_confirm_single"),
                                okText: t("modal.delete"),
                                okType: "danger",
                                cancelText: t("modal.cancel"),
                                onOk: () => dispatch(deleteMany(selectedRowKeys)),
                            })
                        }

                    >
                        {t("table.delete")}
                    </Button>
                </div>

                <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={data.length}
                    onChange={setPage}
                />
            </div>

            <Table<Person>
                rowKey="id"
                columns={columns}
                dataSource={pagedData}
                pagination={false}
                rowSelection={{
                    selectedRowKeys,
                    onChange: keys => setSelectedRowKeys(keys as string[]),
                }}
            />
        </>
    );
}
