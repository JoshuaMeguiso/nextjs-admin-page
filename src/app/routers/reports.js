"use client";
import { StockOutlined } from "@ant-design/icons";
import Link from "next/link";

//Important
const reports = [
  {
    key: "2.1",
    label: (
      <Link href="/pages/masterfiles/stocks-receiving">Accounts Report</Link>
    ),
    icon: <StockOutlined />,
  },
  {
    key: "2.2",
    label: (
      <Link href="/pages/masterfiles/purchase-orders"></Link>
    ),
    icon: <StockOutlined />,
  },
];

export default reports;
