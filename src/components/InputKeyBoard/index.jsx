import { Flex, WhiteSpace } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import { TableOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import styles from './index.less'
import { visible } from 'chalk';
import { Button,Input } from 'antd';
import Province from './Province';
import SlotProvince from './SlotProvince';
import LotteryProvince from './LotteryProvince'
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.hideMenu);
    }
    hideMenu = (e) => {
        this.setState({ visible: false })
    }
    setVisble = (e) => {
        this.setState({ visible: true })
        e.nativeEvent.stopImmediatePropagation()
    }
    setOnChange = (e, item) => {
        const { onChange, value } = this.props;
        let string = value;
        if (item === '删除') {
            string = string.substring(0, string.length - 1);
        } else if (item === '空格') {
            string = string + " ";
        }
        else {
            string = string + item;
        }
        onChange(string)
        e.nativeEvent.stopImmediatePropagation()
    }
    ProvinceFun =() => {
        const { keyState } = this.props;
        if(keyState=='slot'){
            return <SlotProvince onChange={this.setOnChange} />
        }
        if(keyState=='lottery'){
            return <LotteryProvince onChange={this.setOnChange} />
        }
        return <Province onChange={this.setOnChange} />
    }
    render() {
        const { value = "", onClick } = this.props;
        const { visible } = this.state;
        return (
            <div>
                <div className={styles['am-list-item']} onClick={this.setVisble}>
                    {/* <TableOutlined /> */}
                    <div style={{ flex: 1, backgroundColor: '#EEE' }}>
                        {/* placeholder="车道/数字/金额" */}
                        <Input type="text" readonly="readonly" style={{ border: 0 }} value={value} />
                    </div>
                    <Button onClick={onClick} style={{ marginRight: 3, backgroundColor: '#ff8d27', color: '#FFF' }}>投注</Button>
                </div>
                {visible && this.ProvinceFun()}
            </div>
        )
    }
}