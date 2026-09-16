"use client"; // Important
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Provider, useSelector } from "react-redux"; // Import useSelector inside the Provider
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import store from "../../redux/store";
import setAuthToken from "../../utilities/setAuthToken";
import { setAuthentication } from "../../redux/reducers/userSlice";
import AppFooter from "./AppFooter";
import MenuComponent from "./MenuComponent";
import AppHeader from "./AppHeader";
import LoginForm from "../../page";

function LayoutContent({ children }) {
  // Now useSelector is inside Provider
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated || false,
  );
  const collapsed = useSelector((state) => state.collapsed.collapse);
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const user = jwtDecode(token);
        setAuthToken(token);
        dispatch(setAuthentication(user));
      } catch {
        localStorage.removeItem("jwtToken");
      }
    }

    setIsHydrated(true);
  }, [dispatch]);

  if (!isHydrated) {
    return null;
  }

  return isAuthenticated ? (
    <Layout style={{ minHeight: "100vh" }}>
      <MenuComponent />
      <Layout
        style={{
          marginLeft: collapsed ? 0 : 200,
          transition: "margin-left 0.2s",
        }}
      >
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
