"use client"; //Important
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Provider } from "react-redux";
import store from "../../redux/store";
import AppFooter from "./AppFooter";
import MenuComponent from "./MenuComponent";
import AppHeader from "./AppHeader";

function DefaultLayout({ children }) {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <Layout style={{ minHeight: "100vh" }}>
          <MenuComponent />
          <Layout>
            <AppHeader />
            {children}
            <AppFooter />
          </Layout>
        </Layout>
      </AntdRegistry>
    </Provider>
  );
}

export default DefaultLayout;
