import React, { useState, useEffect } from 'react'

  const completionFunc = value => {
    if(String(value).length === 1) return `0${value}`
    return value
  }

  function Timer() {
    const [remainTime, setTime] = useState(100000000000000000)

    useEffect(() => {
      const timer = setTimeout(() => {
        setTime(() => remainTime - 10)
      }, 10)
      return () => {
        clearInterval(timer)
      }
    }, [remainTime])

    const remainHour = parseInt(remainTime / (60 * 60000)) || '00'
    const remainMinutes = parseInt((remainTime % (60 * 60000)) / 60000) || '00'
    const remainSeconds = parseInt((remainTime % 60000) / 1000) || '00'

    return (
      <h3>{completionFunc(remainHour)}:{completionFunc(remainMinutes)}:{completionFunc(remainSeconds)}</h3>
    )
  }

  export default Timer