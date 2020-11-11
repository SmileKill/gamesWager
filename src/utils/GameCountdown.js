import React, { useState, useEffect } from 'react';
export const timers = (wsData) => {
    const [remainTime, setTime] = useState(wsData.countDown);
    const [openId, setOpenId] = useState(null);
    useEffect(() => {
        let timer = ""
        if (remainTime > 0) {
            timer = setTimeout(() => {
                setTime(() => remainTime - 1)
            }, 1000)
        }
        return () => {
            clearInterval(timer)
        }
    }, [remainTime])
    useEffect(() => {
        let propsOpenId = wsData.lastOpenResult ? wsData.lastOpenResult.openId : -1;
        if (propsOpenId !== openId) {
            setTime(wsData.countDown)
            setOpenId(propsOpenId)
        }
    }, [wsData])
    return [remainTime]
}

