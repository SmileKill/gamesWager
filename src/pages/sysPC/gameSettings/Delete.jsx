import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Form, Modal, DatePicker, Popconfirm } from 'antd';
import moment from 'moment';
export default connect(({ sixSetting }) => ({ ...sixSetting }))((props) => {
    const { dispatch, titleName, type, value } = props;
    const confirm = () => {
        console.log(value)
        dispatch({
            type: 'sixSetting/Delete', params: { markSixId: value.id }
        }).then((res) => {
            if (res) {
                props.onFinish()
            }
        })
    }
    return (
        <Popconfirm onConfirm={confirm} title="确认删除么？" okText="是" cancelText="否">
            <a style={{ marginLeft: 10 }}>删除</a>
        </Popconfirm>
    )
})



