import { Modal, Form, Input, Button } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

const validateMessages = {
    required: '${name} is required!',
    types: {
        email: 'email is not validate!',
    },
};


interface LoginFormProps {
    visible: boolean
    onSubmitLoginForm: (values) => void
    onCancelLoginForm: (visible: boolean) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ visible, onSubmitLoginForm, onCancelLoginForm }) => {
    return (
        <Modal
            visible={visible}
            closable={false}
            mask={false}
            footer={null}
        >
            <Form
                onFinish={onSubmitLoginForm}
            >
                <Form.Item
                    name="email"
                    rules={[{ type: 'email', required: true }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true }, { type: 'string', min: 5, max: 20 }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button className="login-form-button" onClick={() => onCancelLoginForm(false)}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
            </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default LoginForm