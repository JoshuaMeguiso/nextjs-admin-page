"use client"; //Important
import masterfiles from "@/app/routers/masterfiles";
import transactions from "@/app/routers/transactions";
import {
  AccountBookOutlined,
  BranchesOutlined,
  FileOutlined,
  StockOutlined,
  TransactionOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { useSelector } from "react-redux";
import reports from "@/app/routers/reports";
import Image from "next/image";
import logo from "../../images/logo.png";

function AppSidebar() {
  const collapsed = useSelector((state) => state.collapsed.collapse);

  const items = [
    {
      key: "1",
      label: "Master Files",
      icon: <FileOutlined />,
      children: masterfiles,
    },
    {
      key: "2",
      label: "Transactions",
      icon: <TransactionOutlined />,
      children: transactions,
    },
    {
      key: "3",
      label: "Reports",
      icon: <TransactionOutlined />,
      children: reports,
    },
  ];

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth="0"
    >
      {/* Start of Logo */}
      <Row justify="center" align="middle">
        <div style={{ fontSize: 50, color: "white", marginTop: 20 }}>
          <Image
            src={logo}
            alt="logo"
            width={150} // Set the width explicitly
            height={150} // Set the height explicitly
            priority
          />
        </div>
      </Row>
      <div
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 10,
          marginBottom: 30,
        }}
      >
        The Generic Pharmacy
      </div>
      {/* <Divider style={{ background: "white" }} /> */}
      {/* End of Logo */}
      <Menu theme="dark" mode="vertical" items={items} />
    </Sider>
  );
}

export default AppSidebar;
