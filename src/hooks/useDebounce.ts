import { useEffect, useRef } from 'react'

export default (cb: CallableFunction, deps: any[], delay = 300) => {
    const cbSpare = useRef<CallableFunction>(cb)
    cbSpare.current = cb
    useEffect(() => {
        const sid = setTimeout(cbSpare.current, delay)
        return () => {
            clearTimeout(sid)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay, ...deps])
}