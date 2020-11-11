import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Table, Button, Form, Card } from 'antd';
import Edit from './Edit';

@connect(({ management, loading }) => ({
    management,
    loading: loading.effects['management/getList'],
}))
@Form.create()
export default class ProgramsTableList extends Component {
    handlePagination = pagination => this.getList(pagination);

    getList = pagination => {
        const { dispatch, form } = this.props;
        const value = form.getFieldsValue();
        dispatch({
            type: 'management/getList',
            params: {
                ...value,
                pageNumber: pagination.current,
                pageSize: pagination.pageSize,
            },
        });
    };

    addUser = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'management/setStateValue', params: { visible: true, type: 'add' } });
    };

    onFreeze = item => {
        const { dispatch } = this.props;
        dispatch({ type: 'management/upFreeze', params: { userId: item.userId } });
    };

    onUnseal = item => {
        const { dispatch } = this.props;
        dispatch({ type: 'management/upUnseal', params: { userId: item.userId } });
    };

    onReset = item => {
        const { dispatch } = this.props;
        dispatch({ type: 'management/upReset', params: { userId: item.userId } });
    };

    onEdit = item => {
        const { dispatch } = this.props;
        dispatch({ type: 'programs/fetchDetailedById', params: item.programId });
    };

    handleReset = () => {
        const { dispatch, form } = this.props;
        form.resetFields();
        dispatch({
            type: 'management/getList',
            params: {
                blurry: '',
                pageNumber: 1,
                pageSize: 10,
            },
        });
    };

    handleExport = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'programs/getExport',
            params: {
                beginTime: '',
                beginTime2: '',
            },
        });
    };

    onDelete = item => {
        const { dispatch } = this.props;
        dispatch({ type: 'programs/fetchDelete', params: [item.programId] });
    };

    render() {
        const { dataSource, pagination } = this.props.management;
        console.log('dataSource:', dataSource);
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '用户名称',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '注册时间',
                dataIndex: 'createDate',
                key: 'createDate',
            },
            {
                title: '账号状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '操作',
                dataIndex: 'avatar',
                key: 'avatar',
                render: (_, record) => {
                    return (
                        <div>
                            <a onClick={() => this.onReset(record)}>密码重置</a>
                            <a style={{ marginLeft: 10 }} onClick={() => this.onFreeze(record)}>
                                冻结
              </a>
                            <a style={{ marginLeft: 10 }} onClick={() => this.onUnseal(record)}>
                                解封
              </a>
                        </div>
                    );
                },
            },
        ];
        return (
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Form layout="inline">
                        <Form.Item label="搜索">
                            {getFieldDecorator('blurry', { initialValue: '' })(
                                <Input style={{ minWidth: 240 }} placeholder="请输入用户名 E-mail进行查询" />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => this.getList(pagination)} type="primary">
                                查询
              </Button>
                            <Button style={{ marginLeft: 10 }} onClick={this.handleReset}>
                                重置
              </Button>
                        </Form.Item>
                    </Form>
                    <Button style={{ marginLeft: 10 }} onClick={this.addUser}>
                        增加用户
          </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={pagination}
                    onChange={this.handlePagination}
                />
                <Edit />
            </Card>
        );
    }
}
