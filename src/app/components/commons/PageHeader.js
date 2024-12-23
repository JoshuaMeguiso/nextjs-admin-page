"use client"; //Important
import React from "react";
import { Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

const PageHeader = ({ title, subTitle }) => {
  return (
    <div style={{ marginBottom: 24, paddingLeft: 25 }}>
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]} // Add gutter for spacing in small screens
      >
        <Col xs={24} sm={24} md={16}>
          <Title level={4} style={{ marginBottom: 0 }}>
            {title}
            {subTitle && (
              <Text type="secondary" style={{ paddingLeft: 20 }}>
                {subTitle}
              </Text>
            )}
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default PageHeader;
