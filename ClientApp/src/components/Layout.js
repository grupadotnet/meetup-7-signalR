import * as React from 'react';
import {Layout as ALayout, Menu} from 'antd';
import Logo from '../assets/img/logo.png'

import "./Layout.scss"
import {Link} from "react-router-dom";

const {Header, Content, Footer} = ALayout;

const items = ['Chat'].map((key) => ({
    key,
    label: <Link to={key.toLowerCase()}>{key}</Link>,
}));

export const Layout = (props) => {
    return (
        <ALayout className="layout">
            <Header>
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </ALayout>
    );
}
