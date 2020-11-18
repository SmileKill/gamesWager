import React, { useState, useEffect } from 'react';
import { Typography, Divider, List, Avatar, Space, Card } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { NavBar, Icon, List as MobileList } from 'antd-mobile';
import { connect } from 'dva';
import { history } from 'umi'
import styles from './index.less'

const row = () => <div>1</div>
export default connect(({ bettingRecord }) => ({ ...bettingRecord }))((props) => {
    const { dispatch } = props;
    useEffect(() => {
        dispatch({ type: 'bettingRecord/getRecordList' })
    }, [])
    const playTypeFun = (item) => {
        switch (item) {
            case 1: return '急速赛车';
            case 2: return '急速赛艇';
            case 3: return '加拿大28';
            case 4: return '六合彩';
            case 5: return '北京赛车';
            case 6: return '北京赛艇';
        }
    }
    return (
        <>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => history.push('/user/personalCenter')}>
                投注记录
            </NavBar>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={props.list}
                footer={
                    <div style={{ textAlign: 'center' }}>-----------我是有底线的--id---------</div>
                }
                renderItem={item => (
                    <Card key={item.id} style={{ marginTop: 3 }}>
                        <div>第{item.tradeId}期</div>
                        <div>游戏类型:{playTypeFun(item.playType)}</div>
                        <div>投注内容:{item.tradeCode}</div>
                        <div>投注金额:{item.tradeMoney}</div>
                        <div>赢取金额:{item.winMoney}</div>
                        <div>投注时间:{item.tradeTime}</div>
                    </Card>
                )}
            />
        </>
    )
});