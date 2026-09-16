"use client"; //Important
import { setCollapse } from "@/app/redux/reducers/collapseSlice";
import { clearUser } from "@/app/redux/reducers/userSlice";
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Menu,
  Space,
} from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

function AppHeader() {
  const collapsed = useSelector((state) => state.collapsed.collapse);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Header
      style={{
        // padding: "0 16px",
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT: SIDEBAR TOGGLE */}
      <div>
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
        <AutoComplete
          value={null}
          // options={search_results.map((item) => ({
          //   value: item.route,
          //   label: item.name,
          // }))}
          options={[]}
          style={{ width: 300 }}
          onFocus={() => {
            // if (!search) {
            //   const filtered = filteredPermissions();
            //   setSearchResults(filtered);
            // }
          }}
          onSearch={(value) => {
            // setSearch(value);
            // if (!value) {
            //   setSearchResults([]);
            //   return;
            // }
            // const filtered = filteredPermissions(value);
            // setSearchResults(filtered);
          }}
          onSelect={(value) => {
            // setSearch("");
            // navigate(value);
          }}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search Forms..."
            style={{ borderRadius: 8 }}
          />
        </AutoComplete>
      </div>
      {/* <Space></Space> */}
      {/* RIGHT: ACTIONS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          // paddingRight: 25,
        }}
      >
        {/* NOTIFICATIONS */}
        {/* <Link to="/notifications"> */}
        <Badge count={5} size="small">
          <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />
        </Badge>
        {/* </Link> */}

        {/* USER INFO (NAME + ROLE) */}
        <div style={{ textAlign: "right", lineHeight: 1.2 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>
            {auth?.user?.name}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>{auth?.user?.role}</div>
        </div>

        {/* AVATAR DROPDOWN */}
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link href="/profile">
                  <span>{"Profile"}</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                disabled={
                  !auth?.user?.permissions?.some(
                    (permission) => permission?.route === "/account-settings",
                  )
                }
                key="settings"
                icon={<SettingOutlined />}
              >
                <Link href="/account-settings">
                  <span>{"Settings"}</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="help_center" icon={<QuestionCircleOutlined />}>
                <Link href="/help-center">
                  <span>{"Help Center"}</span>
                </Link>
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                danger
                onClick={() => dispatch(clearUser())}
              >
                Logout
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
        >
          <Avatar
            style={{
              backgroundColor: "#1890ff",
              cursor: "pointer",
            }}
          >
            {auth?.user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Dropdown>
      </div>
    </Header>
  );
}

export default AppHeader;
