"use client";
import { StockOutlined } from "@ant-design/icons";
import Link from "next/link";

//Important
const transactions = [
  {
    key: "2.1",
    label: (
      <Link href="/pages/masterfiles/stocks-receiving">Stocks Receiving</Link>
    ),
    icon: <StockOutlined />,
  },
  {
    key: "2.2",
    label: (
      <Link href="/pages/masterfiles/purchase-orders">Purchase Order</Link>
    ),
    icon: <StockOutlined />,
  },
];

export default transactions;
