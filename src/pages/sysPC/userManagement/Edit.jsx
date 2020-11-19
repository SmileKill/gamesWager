import React, { Component, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Table, Select, Button, Tabs, Form, Tag, Col, Row, Card, Modal } from 'antd';


export default connect(({ sysPC }) => ({ ...sysPC }))((props) => {
    const { value, dispatch } = props;
    const { type } = value;
    const [form] = Form.useForm();

    const onSubmit = () => {
        let values = form.getFieldsValue();
        dispatch({
            type: 'sysPC/editUser', params: { ...values, type }
        }).then((res) => {
            if (res) {
                props.onFinish()
                onCancel()
            }
        })
    }
    const onCancel = () => {
        props.setValue({
            type: 'close',
            loginName: '',
            password: '',
            userName: '',
            id: 0
        })
    }
    const typeFuc = () => {
        switch (type) {
            case 'add': return '添加用户';
            case 'edit': return '编辑用户';
        }
    }
    useEffect(() => {
        form.setFieldsValue(value);
    }, [value])
    return (
        <Modal
            title={typeFuc()}
            visible={type == 'close' ? false : true}
            //confirmLoading
            onOk={onSubmit}
            onCancel={onCancel}
        >
            <Form form={form} >
                <Form.Item name="userName" label="昵称">
                    <Input style={{ minWidth: 240 }} placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item name="referrer" label="推荐人">
                    <Input style={{ minWidth: 240 }} placeholder="请输入推荐人" />
                </Form.Item>
                {
                    type == 'add' ?
                        <>
                            <Form.Item name="loginName" label="用户名">
                                <Input style={{ minWidth: 240 }} placeholder="请输入用户名" />
                            </Form.Item>
                            <Form.Item name="password" label="密码">
                                <Input style={{ minWidth: 240 }} placeholder="请输入密码" />
                            </Form.Item>

                        </>
                        :
                        null
                }
            </Form>
        </Modal>
    )
})



