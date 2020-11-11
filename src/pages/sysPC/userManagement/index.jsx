import React, { Component, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Table, Button, Form, Card } from 'antd';
import Edit from './Edit';

export default connect(({ sysPC }) => ({ ...sysPC }))((props) => {
    const { dispatch, pagination, dataSource } = props;
    const addUser = () => {
        console.log('adduser')
    }
    useEffect(() => {
        console.log('useEffect')
        dispatch({
            type: 'sysPC/getUserList', params: {
                currentPage: 1,
                pageSize: 10,
                queryString: {
                    loginName:''
                }
            }
        })
    }, [])
    const onFinish = values => {
        dispatch({
            type: 'sysPC/getUserList', params: {
                currentPage: 1,
                pageSize: 10,
                queryString: values
            }
        })
    };
    const handlePagination = pagination => {
        console.log('handlePagination:', pagination)
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
            title: '操作',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, record) => {
                return (
                    <div>
                        <a onClick={() => this.onReset(record)}>编辑</a>
                        {/* <a style={{ marginLeft: 10 }} onClick={() => this.onFreeze(record)}>删除</a> */}
                        <a style={{ marginLeft: 10 }} onClick={() => this.onUnseal(record)}>充值</a>
                    </div>
                );
            },
        },
    ];
    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form layout="inline" onFinish={onFinish}>
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
                dataSource={dataSource}
                rowKey={record => record.id}
                pagination={pagination}
                onChange={handlePagination} //test
            />
            {/* <Edit /> */}
        </Card>
    )
});