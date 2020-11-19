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
            type: 'sysPC/passwordChange', params: { ...values, userId: props.record.id }
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
            <a style={{ marginLeft: 10 }} onClick={() => setVisible(true)}>修改密码</a>
            <Modal
                title={'修改密码'}
                visible={visible}
                onOk={onSubmit}
                onCancel={onCancel}
            >
                <Form form={form} >
                    <Form.Item name="password" label="密码">
                        <InputNumber style={{ minWidth: 240 }} placeholder="请修改密码" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})



