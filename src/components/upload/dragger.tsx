import React, { useState, memo, DragEvent } from 'react'
import classnames from 'classnames'
import Icon from '../icon'

interface DraggerProps {
    onFiles: (files: FileList) => void
}

const Dragger: React.FC<DraggerProps> = props => {
    const
        { onFiles } = props,
        [isOver, setIsOver] = useState(false),
        dropHandle = (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            setIsOver(false)
            const { files } = e.dataTransfer
            onFiles(files)
        },
        dragOverHandle = (e: DragEvent<HTMLDivElement>, over: boolean) => {
            e.preventDefault()
            isOver !== over && setIsOver(over)
        },
        classs = classnames('auvo-upload-dragger', {
            'auvo-upload-is-drag': isOver
        })

    return (
        <div
            className={classs}
            onDrop={dropHandle}
            onDragOver={e => dragOverHandle(e, true)}
            onDragLeave={e => dragOverHandle(e, false)}
        >
            <Icon icon='upload' size='4x' />
            <span>
                {`${isOver ? '松开按键' : '拖动文件'}上传`}
            </span>
        </div >
    )
}

export default memo(Dragger)