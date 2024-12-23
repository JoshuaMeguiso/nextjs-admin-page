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
      key: "2",
      label: "Reports",
      icon: <TransactionOutlined />,
      children: transactions,
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
        <div style={{ fontSize: 50, color: "white" }}>
          <RadarChartOutlined />
        </div>
      </Row>
      <Row justify="center" align="middle">
        <div style={{ color: "white" }}>Radar Technologies</div>
      </Row>
      <Divider style={{ background: "white" }} />
      {/* End of Logo */}
      <Menu theme="dark" mode="vertical" items={items} />
    </Sider>
  );
}

export default AppSidebar;
