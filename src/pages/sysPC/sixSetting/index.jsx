import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Input, Table, Button, Form, Card } from 'antd';
import Edit from './Edit';
import Delete from './Delete';
import Draw from './Draw';
export default connect(({ sixSetting }) => ({ ...sixSetting }))((props) => {
    const { List, userPagination, dispatch } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        dispatch({
            type: 'sixSetting/getFindPageByMarkSix', params: {
                currentPage: 1,
                pageSize: 10,
                queryString: {}
            }
        })
    }, [])
    const onFinish = values => {
        dispatch({
            type: 'sixSetting/getFindPageByMarkSix', params: {
                currentPage: userPagination.current,
                pageSize: 10,
                queryString: { openId: form.getFieldValue('openId') }
            }
        })
    };
    const handlePagination = pagination => {
        dispatch({
            type: 'sixSetting/getFindPageByMarkSix', params: {
                currentPage: pagination.current,
                pageSize: 10,
                queryString: { openId: form.getFieldValue('openId') }
            }
        })
    }
    const columns = [
        {
            title: '期号',
            dataIndex: 'openId',
            key: 'openId',
        },
        {
            title: '开奖红号',
            dataIndex: 'openCode',
            key: 'openCode',
        },
        {
            title: '开奖蓝号',
            dataIndex: 'specialCode',
            key: 'specialCode',
        },
        {
            title: '开奖时间',
            dataIndex: 'openTime',
            key: 'openTime',
        },
        {
            title: '是否开奖',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (_, record) => <Draw value={record} onFinish={onFinish} />,
        },
        {
            title: '操作',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, record) => {
                return (
                    <div>
                        {/* <Edit value={record} titleName={'编辑'} onFinish={onFinish} /> */}
                        <Delete value={record} onFinish={onFinish} />
                    </div>
                );
            },
        },
    ];
    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form form={form} layout="inline" onFinish={onFinish}>
                    <Form.Item name="openId" label="搜索">
                        <Input style={{ minWidth: 240 }} placeholder="请输入期号" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
                <Edit value={{
                    openId:'',
                    openCode:'',
                    specialCode:'',
                    openTime:'',
                }} type={'button'} titleName={'新增'} onFinish={onFinish} />
            </div>
            <Table
                columns={columns}
                dataSource={List}
                rowKey={record => record.id}
                pagination={userPagination}
                onChange={handlePagination} //test
            />
        </Card>
    )
});