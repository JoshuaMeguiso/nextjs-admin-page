"use client";
import { AccountBookOutlined, BranchesOutlined } from "@ant-design/icons";
import Link from "next/link";

//Important
const masterfiles = [
  {
    key: "1.1",
    label: <Link href="/pages/masterfiles/accounts">Accounts</Link>,
    icon: <AccountBookOutlined />,
  },
  {
    key: "1.2",
    label: <Link href="/pages/masterfiles/branches">Branches</Link>,
    icon: <BranchesOutlined />,
  },
];

export default masterfiles;
