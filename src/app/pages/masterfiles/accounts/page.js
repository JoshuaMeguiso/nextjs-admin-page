"use client"; //Important
import AdvanceSearch from "@/app/components/commons/AdvanceSearch";
import FormHeader from "@/app/components/commons/FormHeader";
import { Divider, Form, Row } from "antd";
import Input from "antd/es/input/Input";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";

const title = "Account Form";

function Page() {
  const [search_keyword, setSearchKeyword] = useState("");

  return (
    <Content>
      <FormHeader
        name="search_keyword"
        onSearch={(value, e) => {
          e.preventDefault();
          console.log(value);
        }}
        onChange={(e) => setSearchKeyword(e.target.value)}
        value={search_keyword}
        onNew={() => {}}
        breadcrumb_items={["Master Files", "Accounts"]}
      />

      <AdvanceSearch
        onSearch={() => console.log("search")}
        items={[<Input />, <Input />, <Input />]}
      />

      <Divider />

      <Row justify="space-between" align="middle">
        <span className="module-title">{title}</span>
      </Row>

      <Divider />

      <Form>Content Account Form</Form>
    </Content>
  );
}

export default Page;
