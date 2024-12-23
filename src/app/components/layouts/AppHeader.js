"use client"; //Important
import { setCollapse } from "@/app/redux/reducers/collapseSlice";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Row, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AppHeader() {
  const collapsed = useSelector((state) => state.collapsed.collapse);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);

  return (
    <Header>
      <Row justify="space-between" align="middle">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(setCollapse({ collapse: !collapsed }))}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div>
          <Space>
            <Avatar
              onMouseEnter={() => {
                setHovered(true);
              }}
              onClick={() => {
                console.log("log out");
              }}
              onMouseLeave={() => {
                setHovered(false);
              }}
              size="large"
              icon={hovered ? <LogoutOutlined /> : <UserOutlined />}
            />
            Joshua
          </Space>
        </div>
      </Row>
    </Header>
  );
}

export default AppHeader;
