import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Input, Table, Button, Form, Card } from 'antd';
import Edit from './Edit';
export default connect(({ gameSettings }) => ({ ...gameSettings }))((props) => {
    const { List, Pagination, dispatch } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        dispatch({
            type: 'gameSettings/getFindPage', params: {
                currentPage: 1,
                pageSize: 10,
                queryString: {}
            }
        })
    }, [])
    const onFinish = values => {
        dispatch({
            type: 'gameSettings/getFindPage', params: {
                currentPage: 1,
                pageSize: 10,
                queryString: { playName: form.getFieldValue('playName') }
            }
        })
    };
    const handlePagination = pagination => {
        console.log('handlePagination:', pagination)
        dispatch({
            type: 'gameSettings/getFindPage', params: {
                currentPage: pagination.current,
                pageSize: 10,
                queryString: { playName: form.getFieldValue('playName') }
            }
        })
    }
    const columns = [
        {
            title: '游戏名称',
            dataIndex: 'playName',
            key: 'playName',
        },
        {
            title: '游戏类型',
            dataIndex: 'playType',
            key: 'playType',
        },
        {
            title: '规则名称',
            dataIndex: 'oddsName',
            key: 'oddsName',
        },
        {
            title: '赢率',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: '操作',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, record) => {
                return (
                    <div>
                        <Edit value={record} titleName={'编辑'} onFinish={onFinish} />
                    </div>
                );
            },
        },
    ];
    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form form={form} layout="inline" onFinish={onFinish}>
                    <Form.Item name="playName" label="搜索">
                        <Input style={{ minWidth: 240 }} placeholder="游戏名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
                {/* <Edit value={{
                    id: 0,
                    oddsName: "",
                    playName: "",
                    playType: null,
                    rate: 0,
                }} type={'button'} titleName={'新增'} onFinish={onFinish} /> */}
            </div>
            <Table
                columns={columns}
                dataSource={List}
                rowKey={record => record.id}
                pagination={Pagination}
                onChange={handlePagination} //test
            />
        </Card>
    )
});