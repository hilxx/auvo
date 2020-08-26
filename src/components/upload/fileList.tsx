import React, { memo } from 'react'
import { FileType } from './index'
import Icon from '../icon'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import Progress from '../progress'

export interface FileListProps {
    fileList: Array<FileType>
    progress: boolean
    onRemove: (index: number) => void
}

const _statusIcon = {
    ready: {
        icon: 'hourglass-start',
        className: 'auvo-color-secondary',
    },
    uploading: {
        icon: 'spinner',
        className: 'auvo-color-info',
    },
    success: {
        icon: 'smile',
        className: 'auvo-color-success',
    },
    error: {
        icon: 'sad-cry',
        className: 'auvo-color-danger',
    },
    cancel: {
        icon: 'ban',
        className: 'auvo-color-secondary',
    }
}
const FileList: React.FC<FileListProps> = props => {
    const { fileList = [], progress, onRemove } = props
    return (
        <ul>
            {
                fileList.map((file, index) => (
                    <li
                        key={file.id}
                        className='auvo-upload-item'
                    >
                        <article>
                            <section>
                                <Icon icon='file' />
                                <span className='auvo-upload-file-name'>{file.name}</span>
                            </section>
                            <section>
                                <Icon
                                    icon={_statusIcon[file.status].icon as IconName}
                                    className={
                                        _statusIcon[file.status].className +
                                        ' auvo-upload-item-status'
                                    }
                                    spin={file.status === 'uploading'}
                                />
                                <Icon
                                    className='auvo-upload-remove-item'
                                    icon='window-close'
                                    onClick={() => onRemove(index)}
                                />
                            </section>
                        </article>
                        {
                            progress && file.status !== 'error'
                                ? <Progress value={file.percent} showNumber />
                                : null
                        }
                        {
                            file.status === 'error'
                                ? <span className='auvo-color-danger'>{file.response.message}</span>
                                : null
                        }
                    </li>
                ))
            }
        </ul>
    )
}

export default memo(FileList)