import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Table, Select, Button, Tabs, Form, Tag, Col, Row, Card, Modal } from 'antd';


@connect(({ management, loading }) => ({
    management,
}))

export default class ProgramsTableList extends Component {
    constructor(props) {
        super(props);
    }
    onSubmit = () => {
        const { form, dispatch, management } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            dispatch({
                type: 'management/upEditSave',
                params: values,
                method: management.type == "add" ? 'POST' : 'PUT',
                onCallBack: () => form.resetFields()
            })
        });
    }
    onCancel = () => {
        const { dispatch, form } = this.props;
        form.resetFields();
        dispatch({ type: 'management/setStateValue', params: { visible: false, type: '' } })
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { visible, type } = this.props.management
        return (
            <Modal
                title={type == 'add' ? '添加用户' : '编辑用户'}
                visible={visible}
                //confirmLoading
                onOk={this.onSubmit}
                onCancel={this.onCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="姓名">
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入姓名' }],
                        })(<Input placeholder='请输入姓名' />)}
                    </Form.Item>
                    <Form.Item label="用户邮箱">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入用户邮箱' }],
                        })(<Input placeholder='请输入用户邮箱' />)}
                    </Form.Item>
                    <Form.Item label="用户名">
                        {getFieldDecorator('loginName', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(<Input placeholder='请输入用户名' />)}
                    </Form.Item>
                    <Form.Item label="手机号">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号' }],
                        })(<Input placeholder='请输入手机号' />)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            rules: [{ required: true, message: '请选择性别' }],
                        })(<Input placeholder='请选择性别' />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
