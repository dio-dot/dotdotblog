import { NextPage, NextComponentType } from "next";
import Link from "next/link";
import {
  Menu as AntMenu,
  Button,
  Input,
  Modal as AntModal,
  Form,
  Checkbox,
} from "antd";
import styled from "styled-components";
import {
  GithubOutlined,
  MailOutlined,
  KeyOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useState, useCallback } from "react";
import LoginForm from "./login";
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
const Layout = styled.div`
  min-height: 100%;
  position: relative;
`;
const Header = styled.div`
  width: 200px;
  height: 100vh;
  position: fixed;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
`;
const Menu = styled(AntMenu)`
  border: none;
  flex: 1 1 auto;
  .ant-menu-item-group-title {
    font-weight: 600;
    font-size: 13px;
    ::after {
      position: relative;
      top: 6px;
      display: block;
      width: 100%;
      height: 1px;
      background: #f3f3f3;
      content: "";
    }
  }
  .ant-menu-item {
    font-weight: 600;
    font-size: 15px;
    a:hover {
      color: #ff0050;
    }
    ::after {
      // border-right:5px solid #ff0050;
      border-right: none;
    }
    &.ant-menu-item-selected {
      a {
        color: #ff0050;
      }
      background-color: #f3f3f3;
    }
  }
`;
const Content = styled.div`
  padding-left: 201px;
  overflow: auto;
`;

const Profile = styled.div`
  padding: 20px 0px 10px 0px;
`;
const ProfileItme = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  a {
    margin-top: 5px;
    color: #f0f0f0;
  }
`;
const Search = styled.div`
  padding: 5px 10px;
`;

const Login = styled.div`
  padding: 5px 10px;
`;
const Modal = styled(AntModal)``;
const PageLayout = styled.div`
  padding: 10px;
`;

interface AppLayoutProps {
  chidren: NextPage;
}

const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      type
      jwt
    }
  }
`;

const AppLayout: NextComponentType<AppLayoutProps> = ({ children }) => {
  const [visibleLoginForm, setVisibleLoginForm] = useState<boolean>(false);
  const [loginUserQuery, { data, error, loading }] = useLazyQuery(LOGIN_USER);
  const onSubmitLoginForm = useCallback((values) => {
    loginUserQuery({
      variables: values,
    });
    setVisibleLoginForm(false);
  }, []);
  const onCancelLoginForm = useCallback((visible) => {
    setVisibleLoginForm(visible);
  }, []);
  let user;
  if (data) {
    user = data.loginUser;
  }
  if (error) {
    console.log(error);
  }
  return (
    <Layout>
      {visibleLoginForm && (
        <LoginForm
          visible={visibleLoginForm}
          onCancelLoginForm={onCancelLoginForm}
          onSubmitLoginForm={onSubmitLoginForm}
        />
      )}
      <Header>
        <Profile>
          <ProfileItme>
            <img src="https://via.placeholder.com/100x100" />
          </ProfileItme>
          <ProfileItme>
            <a href="https://github.com/dio-dot" target="_blank">
              <GithubOutlined />
            </a>
          </ProfileItme>
        </Profile>
        <Search>
          <Input.Search />
        </Search>
        <Menu mode="inline">
          <Menu.ItemGroup title="Diodot">
            <Menu.Item key="log">
              <Link
                href={{
                  pathname: "/category",
                  query: { name: "log" },
                }}
                as="/log"
              >
                <a>Log</a>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Dev">
            <Menu.Item key="javascript">
              <Link
                href={{
                  pathname: "/category",
                  query: { name: "javascript" },
                }}
                as="/javascript"
              >
                <a>Javascript</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="react">
              <Link
                href={{
                  pathname: "/category",
                  query: { name: "react" },
                }}
                as="/react"
              >
                <a>React</a>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.Item key="write">
            <Link
              href={{
                pathname: "/wite",
                query: { name: "write" },
              }}
              as="/write"
            >
              <a>Write</a>
            </Link>
          </Menu.Item>
        </Menu>
        <Login>
          {user ? (
            <Button block>LogOut</Button>
          ) : (
            <Button block onClick={() => onCancelLoginForm(true)}>
              Login
            </Button>
          )}
        </Login>
      </Header>

      <Content>
        <PageLayout>{children}</PageLayout>
      </Content>
    </Layout>
  );
};

export default AppLayout;
