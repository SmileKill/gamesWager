import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import styles from './style.less';
const layout = {
    labelCol: {
        span: 12,
        offset: 3,
    },
    wrapperCol: {
        span: 4,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const Login = (props) => {
    const { userLogin = {}, submitting } = props;
    const { status, type: loginType } = userLogin;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(true);
    const [type, setType] = useState('account');
    const handleSubmit = (values) => {
        const { dispatch } = props;
        if (!username || !password) {
            return
        }
        dispatch({
            type: 'login/login',
            payload: { username, password, type },
        });
    };
    return (
        <div className={styles.main}>
            <div className={styles.logo}>
                <div className={styles.header}></div>
                <div className={styles.watermelon}></div>
            </div>
            <div className={styles.loginBox}>
                <div className={styles.input}>
                    <div style={{ marginRight: 5 }}>账号:</div><Input onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div className={styles.input}>
                    <div style={{ marginRight: 5 }}>密码:</div><Input.Password onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <Button loading={submitting} onClick={handleSubmit}><div className={styles.loginButton} /></Button>
                {/* <div className={styles.loginButton} /> */}
                <div style={{ color: '#fff', marginTop: 10 }}>免费注册</div>
            </div>
        </div>
    );
};

export default connect(({ login, loading }) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
}))(Login);
