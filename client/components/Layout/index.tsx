import { NextPage, NextComponentType } from "next";
import styled from "styled-components";
import { Menu } from "antd";
import Link from "next/link";

interface Props {
  chidren: NextPage;
}

const Layout: NextComponentType<Props> = ({ children }) => {
  return (
    <LayoutWrapper>
      <SideBarWrapper>
        <Menu mode="inline">
          <Menu.ItemGroup title="Diodot">
            <Menu.Item key="log">
              <Link href={{ pathname: "/category" }}>
                <a>Log</a>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </SideBarWrapper>
      <PageWrapper>{children}</PageWrapper>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  height: 100%;
`;

const SideBarWrapper = styled.div`
  position: fixed;
  width: 249px;
  height: 100%;
  border-right: 1px solid #f0f0f0;
  @media (max-width: 840px) {
    transform: translateX(-100%);
  }
`;

const PageWrapper = styled.div`
  padding-left: 250px;
  @media (max-width: 840px) {
    padding-left: 0px;
  }
`;

export default Layout;
