import React from 'react';
import styles from './index.less';

const ruleList = [
    {
        headerTitle: '大小单双龙虎格式',
        listItem: [
            {
                title: '案例1:',
                Subtitle: '1大100',
                content: '表示第一名 下注大，下注100积分'
            },
            {
                title: '案例2:',
                Subtitle: '123大小单100',
                content: '表示第一、二、三分别下注 大小单，各100积分'
            },
            {
                title: '案例3:',
                Subtitle: '12龙虎100',
                content: '表示第一、二分别下注龙虎，各100积分'
            },
        ]
    }, {
        headerTitle: '单号数字格式',
        listItem: [
            {
                title: '案例1:',
                Subtitle: '1/2/100',
                content: '表示第一名下注为2号车，下注100积分'
            },
            {
                title: '案例2:',
                Subtitle: '123/235/100',
                content: '表示第一、二、三车道，分别压2、3、5号车，各100积分'
            },
        ]
    }, {
        headerTitle: '冠亚和格式',
        listItem: [
            {
                title: '案例1:',
                Subtitle: '和19/100或9/和/100',
                content: '表示冠亚和19和9各下注100积分'
            },
            {
                title: '案例2:',
                Subtitle: '31119和100',
                content: '表示冠亚和3、11、19各下注100积分，备注，冠亚和只能在3-19之间'
            },
        ]
    }
]

const slotRuleList = [
    {
        headerTitle: '单个下注规则',
        listItem: [
            {
                title: '案例1:',
                Subtitle: '和大/100',
                content: '表示"和大"下注100积分'
            },
        ]
    }, {
        headerTitle: '多个下注规则',
        listItem: [
            {
                title: '案例1:',
                Subtitle: '豹子/100或和大/200',
                content: '表示"豹子"下注100分，"和大"下注200分'
            },
        ]
    },
]

const Index = ({ value }) => {
    const { playType, type } = value;
    if (playType == 3) {
        return (
            <>
                {
                    slotRuleList.map(item => (
                        <div key={1} className={styles.rule}>
                            <div className={styles.header} >{item.headerTitle}</div>
                            <div className={styles.main}>
                                {
                                    item.listItem.map(listItem => (
                                        <div className={styles.listItem}>
                                            <div className={styles.title}>
                                                <div>{listItem.title}</div>
                                                <div>{listItem.Subtitle} </div>
                                            </div>
                                            <div className={styles.content}>{listItem.content}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </>
        )
    }
    return (
        <>
            {
                ruleList.map(item => (
                    <div key={1} className={styles.rule}>
                        <div className={styles.header} >{item.headerTitle}</div>
                        <div className={styles.main}>
                            {
                                item.listItem.map(listItem => (
                                    <div className={styles.listItem}>
                                        <div className={styles.title}>
                                            <div>{listItem.title}</div>
                                            <div>{listItem.Subtitle} </div>
                                        </div>
                                        <div className={styles.content}>{listItem.content}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Index