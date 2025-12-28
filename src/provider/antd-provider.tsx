"use client";

import { ReactNode } from "react";
import { ConfigProvider } from "antd";

export default function AntdProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ConfigProvider>{children}</ConfigProvider>;
}