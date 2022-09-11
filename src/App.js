import React, { useState, useRef, useCallback } from 'react'

export default function App() {
    const [now, setNow] = useState(Date.now())
    const ref = useRef()

    const handleStart = useCallback(() => {
        ref.current = setInterval(() => {
            setNow(Date.now())
        }, 1000)
    }, [])

     const handleStop = useCallback(() => {
         clearInterval(ref.current)
     }, [])

    return (
        <>
            <h1>Now Time : {now}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </>
    )
}
