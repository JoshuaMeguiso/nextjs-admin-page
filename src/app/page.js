"use client"; // Important
//This is Dashboard Page
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import LoginForm from "./components/layouts/LoginForm";
import { Row } from "antd";
import logo from "./images/logo.png";
import Image from "next/image";

export default function Page() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  return isAuthenticated ? (
    <Content>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100%" /* Ensure it takes full parent height */,
          display: "flex",
          textAlign: "center",
        }}
      >
        <Image
          src={logo}
          alt="logo"
          width={200} // Set the width explicitly
          height={200} // Set the height explicitly
          style={{
            margin: "12px",
          }}
          priority
        />
        <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
          INFORMATION SYSTEM
        </span>
      </Row>
    </Content>
  ) : (
    <LoginForm />
  );
}
