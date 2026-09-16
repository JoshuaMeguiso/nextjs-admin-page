"use client"; //Important
import AdvanceSearch from "@/app/components/commons/AdvanceSearch";
import FormHeader from "@/app/components/commons/FormHeader";
import SimpleSelectFieldGroup from "@/app/components/commons/SimpleSelectFieldGroup";
import TextFieldGroup from "@/app/components/commons/TextFieldGroup";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useMemo, useState } from "react";
import { smallFormItemLayout } from "@/app/utilities/Layouts";

const initialAccounts = [
  {
    id: 1,
    code: "1000",
    name: "Cash on Hand",
    type: "Asset",
    status: "Active",
    description: "Petty cash and cash held on site.",
    updatedAt: "2026-09-10",
  },
  {
    id: 2,
    code: "1100",
    name: "Accounts Receivable",
    type: "Asset",
    status: "Active",
    description: "Outstanding customer receivables.",
    updatedAt: "2026-09-08",
  },
  {
    id: 3,
    code: "4000",
    name: "Sales Revenue",
    type: "Revenue",
    status: "Active",
    description: "Revenue from goods and services.",
    updatedAt: "2026-09-01",
  },
  {
    id: 4,
    code: "5000",
    name: "Office Supplies",
    type: "Expense",
    status: "Inactive",
    description: "Office supply expenses.",
    updatedAt: "2026-08-22",
  },
];

const defaultFilters = {
  code: "",
  name: "",
  type: undefined,
  status: undefined,
};

const accountTypes = ["Asset", "Liability", "Equity", "Revenue", "Expense"];

function Page() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [form] = Form.useForm();

  const visibleAccounts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return accounts.filter((account) => {
      const matchesKeyword =
        !keyword ||
        account.code.toLowerCase().includes(keyword) ||
        account.name.toLowerCase().includes(keyword);
      const matchesCode =
        !filters.code ||
        account.code.toLowerCase().includes(filters.code.toLowerCase());
      const matchesName =
        !filters.name ||
        account.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesType = !filters.type || account.type === filters.type;
      const matchesStatus =
        !filters.status || account.status === filters.status;

      return (
        matchesKeyword &&
        matchesCode &&
        matchesName &&
        matchesType &&
        matchesStatus
      );
    });
  }, [accounts, filters, searchKeyword]);

  const openCreateModal = () => {
    setEditingAccount(null);
    form.resetFields();
    form.setFieldsValue({ status: "Active" });
    setIsModalOpen(true);
  };

  const openEditModal = (account) => {
    setEditingAccount(account);
    form.setFieldsValue(account);
    setIsModalOpen(true);
  };

  const handleSave = (values) => {
    if (editingAccount) {
      setAccounts((current) =>
        current.map((account) =>
          account.id === editingAccount.id
            ? {
                ...account,
                ...values,
                updatedAt: new Date().toISOString().slice(0, 10),
              }
            : account,
        ),
      );
      message.success("Account updated");
    } else {
      setAccounts((current) => [
        ...current,
        {
          ...values,
          id: Date.now(),
          updatedAt: new Date().toISOString().slice(0, 10),
        },
      ]);
      message.success("Account created");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (accountId) => {
    setAccounts((current) =>
      current.filter((account) => account.id !== accountId),
    );
    message.success("Account deleted");
  };

  const handleResetFilters = () => {
    setSearchKeyword("");
    setFilters(defaultFilters);
  };

  const columns = [
    { title: "Code", dataIndex: "code", key: "code", width: 120 },
    { title: "Account name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type", width: 140 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={status === "Active" ? "success" : "default"}>{status}</Tag>
      ),
    },
    { title: "Updated", dataIndex: "updatedAt", key: "updatedAt", width: 140 },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, account) => (
        <Space>
          <Button
            aria-label={`Edit ${account.name}`}
            icon={<EditOutlined />}
            onClick={() => openEditModal(account)}
            type="text"
          />
          <Popconfirm
            title="Delete this account?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(account.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              aria-label={`Delete ${account.name}`}
              danger
              icon={<DeleteOutlined />}
              type="text"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Content>
      <FormHeader
        name="searchKeyword"
        onSearch={setSearchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        value={searchKeyword}
        onNew={openCreateModal}
        breadcrumb_items={["Master Files", "Accounts"]}
      />

      <AdvanceSearch
        onSearch={() => setFilters({ ...filters })}
        additional_buttons={[
          <Button
            key="reset"
            icon={<ReloadOutlined />}
            onClick={handleResetFilters}
          >
            Reset
          </Button>,
        ]}
        items={[
          <TextFieldGroup
            key="code"
            label="Account code"
            name="code"
            placeholder="e.g. 1000"
            value={filters.code}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                code: event.target.value,
              }))
            }
            formItemLayout={smallFormItemLayout}
          />,
          <TextFieldGroup
            key="name"
            label="Account name"
            name="name"
            placeholder="Search by name"
            value={filters.name}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            formItemLayout={smallFormItemLayout}
          />,
          <SimpleSelectFieldGroup
            key="type"
            label="Account type"
            name="type"
            options={accountTypes}
            value={filters.type}
            onChange={(type) => setFilters((current) => ({ ...current, type }))}
            allowClear
            formItemLayout={smallFormItemLayout}
          />,
          <SimpleSelectFieldGroup
            key="status"
            label="Status"
            name="status"
            options={["Active", "Inactive"]}
            value={filters.status}
            onChange={(status) =>
              setFilters((current) => ({ ...current, status }))
            }
            allowClear
            formItemLayout={smallFormItemLayout}
          />,
        ]}
      />

      <div style={{ marginTop: 24 }}>
        <Space align="baseline" style={{ marginBottom: 16 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Accounts
          </Typography.Title>
          <Typography.Text type="secondary">
            {visibleAccounts.length} records
          </Typography.Text>
        </Space>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={visibleAccounts}
          locale={{ emptyText: "No accounts match your filters" }}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          scroll={{ x: 760 }}
        />
      </div>

      <Modal
        title={editingAccount ? "Edit account" : "New account"}
        open={isModalOpen}
        okText={editingAccount ? "Save changes" : "Create account"}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="Account code"
            name="code"
            rules={[{ required: true, message: "Enter an account code" }]}
          >
            <Input placeholder="e.g. 1000" />
          </Form.Item>
          <Form.Item
            label="Account name"
            name="name"
            rules={[{ required: true, message: "Enter an account name" }]}
          >
            <Input placeholder="e.g. Cash on Hand" />
          </Form.Item>
          <Form.Item
            label="Account type"
            name="type"
            rules={[{ required: true, message: "Select an account type" }]}
          >
            <Select
              options={accountTypes.map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select
              options={["Active", "Inactive"].map((status) => ({
                label: status,
                value: status,
              }))}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Optional description" />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}

export default Page;
