import React, { useEffect, useRef } from 'react'

export type CbType = (bool: boolean) => void

export default (cb: CbType, refs: Array<React.RefObject<HTMLElement>> = []) => {
    const cbSpare = useRef<CbType>(cb)  /* 存储最新的cb */
    cbSpare.current = cb

    useEffect(() => {
        const
            cb = cbSpare.current,
            els = refs.map((ref) => ref.current),
            handle = (e: Event) => {
                const { target } = e
                for (const el of els) if (el) {
                    if (el === target
                        || el.compareDocumentPosition(target as HTMLElement) === 20
                    ) return cb(true)
                }
                cb(false)
            }
        document.addEventListener('click', handle)
        return () => {
            document.removeEventListener('clcik', handle)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs)
}