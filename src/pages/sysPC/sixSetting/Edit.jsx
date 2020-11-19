import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Form, Modal, DatePicker, Button } from 'antd';
import moment from 'moment';
export default connect(({ sixSetting }) => ({ ...sixSetting }))((props) => {
    const { dispatch, titleName, type, value } = props;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const onSubmit = () => {
        let values = form.getFieldsValue();
        dispatch({
            type: 'sixSetting/Edit', params: {
                ...values,
                openTime: moment(values.openTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
            }
        }).then((res) => {
            if (res) {
                props.onFinish()
                onCancel()
            }
        })
    }
    const onCancel = () => {
        setVisible(false)
    }
    useEffect(() => {
        form.setFieldsValue({
            ...value,
            openTime: moment(value.openTime ? value.openTime : new Date(), 'YYYY-MM-DD HH:mm:ss')
        });
    }, [visible])
    return (
        <>
            {type == 'button' ?
                <Button style={{ marginLeft: 10 }} onClick={() => setVisible(true)}>  {titleName} </Button>
                : <a style={{ marginLeft: 10 }} onClick={() => setVisible(true)}>{titleName}</a>
            }
            <Modal
                title={titleName}
                visible={visible}
                onOk={onSubmit}
                onCancel={onCancel}
            >
                <Form form={form} >
                    <Form.Item name="openId" label="期号">
                        <Input style={{ minWidth: 240 }} placeholder="请输入期号" />
                    </Form.Item>
                    <Form.Item name="openCode" label="红号">
                        <Input style={{ minWidth: 240 }} placeholder="请输入红号" />
                    </Form.Item>
                    <Form.Item name="specialCode" label="蓝号">
                        <Input style={{ minWidth: 240 }} placeholder="请输入蓝号" />
                    </Form.Item>
                    <Form.Item name="openTime" label="开奖时间">
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})



