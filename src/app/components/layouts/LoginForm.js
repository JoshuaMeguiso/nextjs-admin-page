"use client"; // Important
import { Card, Form, Button } from "antd";
import TextFieldGroup from "../commons/TextFieldGroup";
import { useState } from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
import axios from "axios";
import setAuthToken from "../../utilities/setAuthToken";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../../redux/reducers/userSlice";
import { useRouter } from "next/navigation";

const initialValues = {
  username: "",
  password: "",
};

export default function Page() {
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="container">
      <Card className="login-card">
        <Form
          layout="vertical"
          onFinish={() => {
            axios
              .post("/api/users/login", { ...state })
              .then(async (response) => {
                const {
                  token,
                  permissions,
                  suppliers = [],
                  companies,
                } = response.data;

                const lock_date_reponse = await axios.get(
                  "/api/account-settings/lock_transaction_date"
                );

                localStorage.setItem("jwtToken", token);
                setAuthToken(token);

                const decoded = {
                  ...jwtDecode(token),
                  permissions,
                  suppliers,
                  companies,
                  lock_date: lock_date_reponse.data?.value,
                };

                dispatch(setAuthentication(decoded));

                router.push("/");
              })
              .catch((error) => {
                setErrors(error.response?.data);
              });
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
