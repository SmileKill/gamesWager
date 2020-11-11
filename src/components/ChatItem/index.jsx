import React from 'react';
import SysItem from './SysItem';
import UserItems from './UserItem';
import History from "./History";
import Record from "./Record";
import SystemMaintenance from "./SystemMaintenance";
import SysItemSlot from "./SysItemSlot";
import Rule from "./Rule";
//type 1系统推送当期消息  2系统推送用户下注消息  3往期结果  4投注记录 5系统维护 6slot系统推送当期消息
const Index = ({ value }) => {
    const { type } = value;
    if (type == 1) {
        return <SysItem value={value} />
    }
    if (type == 2) {
        return <UserItems value={value} />
    }
    if (type == 3) {
        return <History value={value} />
    }
    if (type == 4) {
        return <Record value={value} />
    }
    if (type == 5) {
        return <SystemMaintenance value={value} />
    }
    if (type == 6) {
        return <SysItemSlot value={value} />
    }
    if (type == 7) {
        return <Rule value={value} />
    }
}

export default Index