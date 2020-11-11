import { InputItem, Toast, List, Modal } from 'antd-mobile';
import { Input } from 'antd'
import { connect } from 'dva';
import styles from './index.less'
import pngs from './Img';
import { history } from 'umi'

const gameListItem = (item) => (
    <div onClick={() => history.push(item.path)} style={{ width: '28%', marginTop: 8 }}>
        <img style={{ backgroundSize: 'contain', width: '100%' }} src={item.img}></img>
    </div>
)
export default connect(({ login }) => ({ ...login }))((props) => {
    const { principal } = props;
    console.log('principal:',principal)
    return (
        <div className={styles.container}>
            <div style={{ marginTop: 45 }} className={styles.line}>用户名:{principal.user.userName}</div>
            <div className={styles.line}>余额:{principal.user.money}</div>
            <div className={styles.main}>
                {
                    pngs.map(item => gameListItem(item))
                }
            </div>
            <div className={styles.bottom}>
                <div>游戏大厅</div>
                <div onClick={() => history.push('/user/personalCenter')}>个人中心</div>
            </div>
        </div>
    )
});

