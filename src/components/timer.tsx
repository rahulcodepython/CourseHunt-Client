import React from 'react'
import { zeroPad } from 'react-countdown';

const Timer = ({ minutes, seconds, completed }: {
    minutes: number,
    seconds: number,
    completed: boolean
}) => {
    if (!completed) {
        return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    } else {
        return <></>
    }
}

export default Timer
