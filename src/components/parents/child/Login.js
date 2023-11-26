import React, { useContext, useEffect, useState } from "react";
import { Form, message, Input, Button } from "antd";
import { store } from "../../../helper/Reducer";
import authActions from "../../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [val, setVal] = useState({});

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector(state => state.auth.profile)


  // const context = useContext(store)
  // const { state, dispatch } = context

  // console.log("isiState", state)

  // // useEffect(()=>{
  // //   dispatch({type:'SET', payload:{test:'lala'} })
  // // },[])

  // handle jika form semua field terisi
  const onFinish = async (values) => {
    try {
      const body = {
        email : values.email,
        passwords : values.password
      }
      await dispatch(authActions.loginThunk(body));
      navigate('/dashboard')
      message.success("Login success");
    } catch (error) {
      message.error("username/password wrong");
    }
  };

  return (
    <>
      <div className="">
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          style={{ maxWidth: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                pattern:
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please Input Your Email Correctly",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 21,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
