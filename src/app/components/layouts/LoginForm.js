"use client"; // Important
import { Card, Form, Button } from "antd";
import TextFieldGroup from "../commons/TextFieldGroup";
import { useState } from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../redux/reducers/userSlice";
import { useRouter } from "next/navigation";

const initialValues = {
  username: "",
  password: "",
};

const sampleCredentials = {
  username: "admin",
  password: "admin12345",
};

const sampleUser = {
  username: sampleCredentials.username,
  permissions: [],
  suppliers: [],
  companies: [],
};

export default function Page() {
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="container">
      <Card className="login-card">
        <Form
          layout="vertical"
          onFinish={() => {
            if (
              state.username !== sampleCredentials.username ||
              state.password !== sampleCredentials.password
            ) {
              setErrors({ username: "Invalid demo credentials" });
              return;
            }

            setErrors({});
            dispatch(setAuthentication(sampleUser));
            router.push("/");
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Image
              src={logo}
              alt="logo"
              width={200} // Set the width explicitly
              height={200} // Set the height explicitly
              priority
            />
          </div>

          <TextFieldGroup
            label="Username"
            error={errors.username}
            name="username"
            value={state.username}
            onChange={(e) => {
              const { name, value } = e.target;
              setState((prev) => ({ ...prev, [name]: value }));
            }}
          />

          <TextFieldGroup
            type="password"
            label="Password"
            error={errors.password}
            name="password"
            value={state.password}
            onChange={(e) => {
              const { name, value } = e.target;
              setState((prev) => ({ ...prev, [name]: value }));
            }}
          />

          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
