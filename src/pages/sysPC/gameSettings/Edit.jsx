import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Form, Modal, Button, InputNumber, Select } from 'antd';
import moment from 'moment';
import { gameList } from '@/utils/globalData';
const { Option } = Select;
export default connect(({ sixSetting }) => ({ ...sixSetting }))((props) => {
    const { dispatch, titleName, type, value } = props;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const onSubmit = () => {
        let values = form.getFieldsValue();
        dispatch({
            type: 'gameSettings/Edit', params: {
                ...value,
                ...values,
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
        form.setFieldsValue(value);
    }, [visible])
    const onPlayChange = value => {
        switch (value) {
            case '极速赛车':
                form.setFieldsValue({ playType: 1 });
                return;
            case '极速赛艇':
                form.setFieldsValue({ playType: 2 });
                return;
            case '加拿大28':
                form.setFieldsValue({ playType: 3 });
                return;
            case '六合彩':
                form.setFieldsValue({ playType: 4 });
                return;
            case '北京赛车':
                form.setFieldsValue({ playType: 5 });
                return;
            case '北京赛艇':
                form.setFieldsValue({ playType: 6 });
                return;
        }
    };
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
                    <Form.Item name="playName" label="游戏名称">
                        <Select disabled={true} onChange={onPlayChange} placeholder="游戏名称">
                            {gameList.map(item => <Option value={item.playName}>{item.playName}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="playType" label="游戏类型">
                        <Select disabled={true} onChange={onPlayChange} placeholder="游戏类型">
                            {gameList.map(item => <Option value={item.playType}>{item.playName}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="oddsName" label="规则名称">
                        <Input disabled={true} style={{ minWidth: 240 }} placeholder="规则名称" />
                    </Form.Item>
                    <Form.Item name="rate" label="赢率">
                        <InputNumber min={0}  step={0.01}  />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})



