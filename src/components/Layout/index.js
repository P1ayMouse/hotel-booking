import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import { logout } from "../../store/slices/userSlices";

import {Layout, Button, Menu, Row, Col, Dropdown, Space, Typography} from "antd";
import {
    LogoutOutlined,
    DownOutlined,
    GithubOutlined,
    LinkedinOutlined, MailOutlined
} from "@ant-design/icons";
import "./index.css";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export default function LayoutComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = useSelector(state => state.user.isLogin);
    const selectedKey = isLogin ? location.pathname : "/login";

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const menuItems = [
        {
            key: "/",
            label: <NavLink to="/">Резюме</NavLink>,
        },
        {
            key: "/todo",
            label: <NavLink to={"/todo"}>To Do</NavLink>,
        },
    ];

    const dropdownItems = [
        {
            key: "/register",
            label: <NavLink to={"/register"}>Реєстрація</NavLink>,
        },
        {
            key: "/login",
            label: <NavLink to={"/login"}>Логін</NavLink>,
        },
    ];

    if (!isLogin) {
        menuItems.push({
            key: "dropdown",
            label: (
                <Dropdown menu={{ items: dropdownItems }}>
                    <Space>
                        Обліковий запис
                        <DownOutlined />
                    </Space>
                </Dropdown>
            ),
        });
    }

    return (
        <Layout className={`layout`}>
            <Header className={`header`} style={{ padding: "0 20px" }}>
                <div className="header-container">
                    <Row align="middle" justify="space-between" style={{ width: "100%" }}>
                        <Col flex="1">
                            <Menu
                                mode="horizontal"
                                theme="light"
                                selectedKeys={[selectedKey]}
                                items={menuItems}
                            />
                        </Col>

                        <Col>
                            <Row align="middle" gutter={16} className="header-right">
                                {isLogin && (
                                    <Col>
                                        <Button
                                            type="primary"
                                            danger
                                            icon={<LogoutOutlined />}
                                            onClick={handleLogout}
                                        >
                                            Вихід
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Header>
            <Content className={`content`}>
                <Outlet />
            </Content>
            <Footer className="footer" >
                <Row justify="center" gutter={[16, 16]}>
                    <Col>
                        <Text strong>© 2025 Artem Ryzhenko</Text>
                    </Col>
                    <Col>
                        <Space size="large">
                            <a href="mailto:artem@ryzhenko.com">
                                <MailOutlined /> Email
                            </a>
                            <a href="https://linkedin.com/in/artem-ryzhenko-886601172/" target="_blank" rel="noopener noreferrer">
                                <LinkedinOutlined /> LinkedIn
                            </a>
                            <a href="https://github.com/P1ayMouse" target="_blank" rel="noopener noreferrer">
                                <GithubOutlined /> GitHub
                            </a>
                        </Space>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
}
