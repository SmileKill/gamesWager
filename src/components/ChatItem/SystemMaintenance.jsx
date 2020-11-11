import React from 'react';
import styles from './index.less';
const Index = ({ value }) => {
    const { tradeCode, userName } = value;
    return (
        <div key={1} className={styles.userChat} style={{width:'95%'}}>
            <div className={styles.listItem} >
                <div style={{ fontWeight: "bold", marginRight: 3 }}>{value.data}</div>
            </div>
        </div>
    )
}

export default Index