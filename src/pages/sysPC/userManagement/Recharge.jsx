import React, { useState } from 'react';
import { connect } from 'dva';
import { InputNumber, Form, Modal } from 'antd';


export default connect(({ sysPC }) => ({ ...sysPC }))((props) => {
    const { dispatch } = props;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const onSubmit = () => {
        let values = form.getFieldsValue();
        dispatch({
            type: 'sysPC/recharge', params: { ...values, userId: props.record.id }
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
    return (
        <>
            <a style={{ marginLeft: 10 }} onClick={() => setVisible(true)}>充值</a>
            <Modal
                title={'充值'}
                visible={visible}
                onOk={onSubmit}
                onCancel={onCancel}
            >
                <Form form={form} >
                    <Form.Item name="money" label="金额">
                        <InputNumber style={{ minWidth: 240 }} placeholder="请输入账号" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})



