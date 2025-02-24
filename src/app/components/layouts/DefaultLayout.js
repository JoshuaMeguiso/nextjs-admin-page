"use client"; // Important
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Provider, useSelector } from "react-redux"; // Import useSelector inside the Provider
import store from "../../redux/store";
import AppFooter from "./AppFooter";
import MenuComponent from "./MenuComponent";
import AppHeader from "./AppHeader";
import LoginForm from "../../page";

function LayoutContent({ children }) {
  // Now useSelector is inside Provider
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated || false
  );

  return isAuthenticated ? (
    <Layout style={{ minHeight: "100vh" }}>
      <MenuComponent />
      <Layout>
        <AppHeader />
        {children}
        <AppFooter />
      </Layout>
    </Layout>
  ) : (
    <LoginForm />
  );
}

export default function DefaultLayout({ children }) {
  return (
    <AntdRegistry>
      <Provider store={store}>
        <LayoutContent>{children}</LayoutContent>
      </Provider>
    </AntdRegistry>
  );
}
