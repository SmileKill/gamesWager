import { Typography, Divider } from 'antd';
import { NavBar, Icon, List } from 'antd-mobile';
import { connect } from 'dva';
import { history } from 'umi'
import Password from './Password';
const Item = List.Item;



export default connect(({ login }) => ({ ...login }))((props) => {
    const { principal } = props;
    console.log('principal:', principal)
    return (
        <>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => history.push('/user/gameLists')}
            // rightContent={[
            //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            //     <Icon key="1" type="ellipsis" />,
            // ]}
            >个人中心</NavBar>

            <List renderHeader={() => '我的功能'} className="my-list">
                <Item extra="" arrow="horizontal" onClick={() => history.push('/user/bettingRecord')}>投注记录</Item>
                <Password record={principal.user} />
                <Item extra="" arrow="horizontal" onClick={() => history.push('/')}>退出登录</Item>
            </List>

        </>
    )
});