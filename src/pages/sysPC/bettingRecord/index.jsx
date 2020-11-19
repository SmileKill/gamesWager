import React, { Component, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Table, Button, Form, Card } from 'antd';
import { gameList } from '@/utils/globalData';
export default connect(({ sysPC }) => ({ ...sysPC }))((props) => {
    const { tradeList, tradePagination, dispatch } = props;
    const [form] = Form.useForm();
    
    useEffect(() => {
        dispatch({
            type: 'sysPC/getTradeList', params: {
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
            type: 'sysPC/getTradeList', params: {
                currentPage: 1,
                pageSize: 10,
                queryString: values
            }
        })
    };
    const handlePagination = pagination => {
        dispatch({
            type: 'sysPC/getTradeList', params: {
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
            title: '登录名',
            dataIndex: 'loginName',
            key: 'loginName',
        },
        {
            title: '期号',
            dataIndex: 'tradeId',
            key: 'tradeId',
        },
        {
            title: '赢取金额',
            dataIndex: 'winMoney',
            key: 'winMoney',
        },
        {
            title: '下注时间',
            dataIndex: 'tradeTime',
            key: 'tradeTime',
        },
        {
            title: '下注内容',
            dataIndex: 'tradeCode',
            key: 'tradeCode',
        },
        {
            title: '游戏类型',
            dataIndex: 'playType',
            key: 'playType',
            render: (_, record) => {
                let name =  gameList.find(item => item.playType == record.playType).playName;
                return name
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
            </div>
            <Table
                columns={columns}
                dataSource={tradeList}
                rowKey={record => record.id}
                pagination={{ ...tradePagination, showSizeChanger: false }}
                onChange={handlePagination} //test
            />
            {/* <Edit /> */}
        </Card>
    )
});