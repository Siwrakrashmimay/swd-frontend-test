"use client";

import "@/styles/global.scss";
import "@/styles/layout-style.module.scss";

import { useEffect } from "react";
import { Provider } from "react-redux";

import Providers from "./providers";       
import AntdProvider from "./antd-provider"; 
import { store } from "@/store";               

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AntdProvider>
          <Provider store={store}>
            <Providers>
              {children}
            </Providers>
          </Provider>
        </AntdProvider>
      </body>
    </html>
  );
}
