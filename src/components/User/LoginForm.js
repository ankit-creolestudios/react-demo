import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, Input, Layout, Row } from "antd";
const { Content } = Layout;
const LoginForm = () => {
  const onFinish = async (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("failed", errorInfo);
  };
  return (
    <div className="login__form">
      <div className="login__wrapper">
        <Content>
          <Row>
            <Col s={32} sm={32} md={16} lg={8}>
              <div className="shadow-form">
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  {" "}
                  <h1 className="mb-3">Login</h1>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                    ]}
                    autoComplete="off"
                  >
                    <Input autoComplete="off" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <Input.Password autoComplete="off" />
                  </Form.Item>
                  <div className="mb-4">
                    {/* <Link href="/password/forgot-password">Forgot Password?</Link> */}
                  </div>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                  <div className="py-1 mt-3 text-center">
                    {/* <Link href="/register">New User?</Link> */}
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Content>
      </div>
    </div>
  );
};

export default LoginForm;
