import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Table, Button, Form, Card } from 'antd';
import Edit from './Edit';
import Recharge from './Recharge';
import Password from './Password';
export default connect(({ sysPC }) => ({ ...sysPC }))((props) => {
    const { userList, userPagination, dispatch } = props;
    const [form] = Form.useForm();
    const [value, setValue] = useState({
        type: 'close',
        loginName: '',
        password: '',
        userName: '',
        id: 0
    });
    const addUser = () => {
        setValue({
            type: 'add',
            loginName: '',
            password: '',
            userName: '',
            id: 0
        })
    }
    const onEdit = (record) => {
        setValue({ ...record, type: 'edit' })
    }
    
    useEffect(() => {
        dispatch({
            type: 'sysPC/getUserList', params: {
                currentPage: 1,
                pageSize: 10,
                queryString: {
                    loginName: ''
                }
            }
        })
    }, [])
    const onFinish = values => {
        dispatch({
            type: 'sysPC/getUserList', params: {
                currentPage: userPagination.current,
                pageSize: 10,
                queryString: { loginName: form.getFieldValue('loginName') }
            }
        })
    };
    const handlePagination = pagination => {
        dispatch({
            type: 'sysPC/getUserList', params: {
                currentPage: pagination.current,
                pageSize: 10,
                queryString: { loginName: form.getFieldValue('loginName') }
            }
        })
    }
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户昵称',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '登录名',
            dataIndex: 'loginName',
            key: 'loginName',
        },
        {
            title: '推荐人',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '余额',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '操作',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, record) => {
                return (
                    <div>
                        <a onClick={() => onEdit(record)}>编辑</a>
                        <Recharge record={record} onFinish={onFinish} />
                        <Password record={record} onFinish={onFinish} />
                    </div>
                );
            },
        },
    ];
    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form form={form} layout="inline" onFinish={onFinish}>
                    <Form.Item name="loginName" label="搜索">
                        <Input style={{ minWidth: 240 }} placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
                <Button style={{ marginLeft: 10 }} onClick={addUser}> 增加用户 </Button>
            </div>
            <Table
                columns={columns}
                dataSource={userList}
                rowKey={record => record.id}
                pagination={userPagination}
                onChange={handlePagination} //test
            />
            <Edit value={value} setValue={setValue} onFinish={onFinish} />
        </Card>
    )
});