import { NextPage, NextComponentType } from "next";
import Link from "next/link";
import { Menu as antMenu, Input } from "antd";
import { GithubOutlined, MailOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface AppLayoutProps {
  chidren: NextPage;
}
const color = {
  primary: "#00000045",
  primaryContrast: "#8c8c8c",
  secondary: "#555555",
  secondaryContrast: "#333333",
  border: "#e1e4e8",
};

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;
const LeftPane = styled.div`
  flex: 0 1 200px;
  border-right: none;
  box-shadow: 1px 0px 3px #00000045;
`;
const Profile = styled.div`
  padding: 20px;
`;
const ProfileItme = styled.div`
  display: flex;
  justify-content: center;
`;
const Search = styled.div`
  padding: 5px 10px;
`;
const IconButton = styled.a`
  color: ${color.primary};
  //@ts-ignore
  font-size: ${(props) => (props.size ? props.size : "20px")};
  &:hover {
    color: ${color.primaryContrast};
  }
`;
const Menu = styled(antMenu)`
  border-right: 0px;
`;
const Item = styled(antMenu.Item)`
  &.ant-menu-item {
    background-color: transparent !important;
  }
  &.ant-menu-item {
    ::after {
      border-right: 3px solid #f48024;
    }
    a {
      color: rgba(0, 0, 0, 0.65);
      :hover {
        color: #ff6b6b;
      }
    }
  }
`;
const RigthPane = styled.div`
  flex: 1 1 auto;
  padding: 10px;
`;

const AppLayout: NextComponentType<AppLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <LeftPane>
        <Profile>
          <ProfileItme>
            <img src="https://via.placeholder.com/100x100" />
          </ProfileItme>
          <ProfileItme>
            <IconButton href="https://github.com/dio-dot" target="_blank">
              <GithubOutlined />
            </IconButton>
          </ProfileItme>
        </Profile>
        <Search>
          <Input.Search />
        </Search>
        <Menu mode="horizontal">
          <Menu.ItemGroup key="1" title="Diodot">
            <Item key="/log">
              <Link
                href={{
                  pathname: "/category",
                  query: { name: "Log" },
                }}
                as="/log"
              >
                <a>Log</a>
              </Link>
            </Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="2" title="Dev">
            <Item key="/algorithm">
              <Link
                href={{
                  pathname: "/category",
                  query: { name: "Algorithm" },
                }}
                as="/algorithm"
              >
                <a>Algorithm</a>
              </Link>
            </Item>
            <Item key="/react">
              <Link
                href={{
                  pathname: "/category",
                  query: { name: "React" },
                }}
                as="/react"
              >
                <a>React</a>
              </Link>
            </Item>
            <Item key="/write">
              <Link
                href={{
                  pathname: "/write",
                }}
                as="/write"
              >
                <a>Write</a>
              </Link>
            </Item>
          </Menu.ItemGroup>
        </Menu>
      </LeftPane>
      <RigthPane>{children}</RigthPane>
    </Layout>
  );
};

export default AppLayout;
