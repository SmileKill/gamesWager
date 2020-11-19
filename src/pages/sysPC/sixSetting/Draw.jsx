import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Form, Modal, DatePicker, Popconfirm } from 'antd';
import moment from 'moment';
export default connect(({ sixSetting }) => ({ ...sixSetting }))((props) => {
    const { dispatch,  value } = props;
    const confirm = () => {
        console.log(value)
        dispatch({
            type: 'sixSetting/Draw', params: { markSixId: value.id }
        }).then((res) => {
            if (res) {
                props.onFinish()
            }
        })
    }
    if (value.isOpen) {
        return <a style={{ marginLeft: 10, color: '#eee' }}>开奖</a>
    }
    return (
        <Popconfirm onConfirm={confirm} title="确认开奖么？" okText="是" cancelText="否">
            <a style={{ marginLeft: 10 }}>开奖</a>
        </Popconfirm>
    )
})



