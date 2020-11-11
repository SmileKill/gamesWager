import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './index.less';
class Province extends Component {
    render() {
        let provincesRow = [ "和大", "和小", "和单", "和双", "和大单", "和大双", "和小单", "和小双",];
        let provincesColumn = ["豹子", "顺子", "对子", "或"];
        const numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "/", "0"]
        const RightKeys = ['删除']
        return (
            <div className={styles.province}>
                <div className={styles.header}>
                    {
                        provincesRow.map((item, i) => {
                            return (
                                <div className={styles.item} onClick={(e) => this.props.onChange(e, item)} key={i}>{item}</div>
                            )
                        })
                    }
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', overflowY: 'auto', width: 60, marginLeft: 5, marginTop: 3 }}>
                        {
                            provincesColumn.map((item, i) => {
                                return (
                                    <div className={styles.leftItem} onClick={(e) => this.props.onChange(e, item)} key={i}>{item}</div>
                                )
                            })
                        }
                    </div>
                    <div style={{ display: 'flex', overflow: 'hidden', margin: 3, flexWrap: 'wrap', flex: 1 }}>
                        {
                            numberKeys.map((item, i) => {
                                return (
                                    <Button className={styles.numberItems} onClick={(e) => this.props.onChange(e, item)} key={i}>{item}</Button>
                                )
                            })
                        }
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', overflowY: 'auto', width: 80, marginRight: 5, marginTop: 3 }}>
                        {
                            RightKeys.map((item, i) => {
                                return (
                                    <div className={styles.rightItem} onClick={(e) => this.props.onChange(e, item)} key={i}>{item}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Province;