import React, { useRef, useCallback, useState, ChangeEvent } from 'react'
import Button from '../button'
import axios from 'axios'
import FileList from './fileList'
import Dragger from './dragger'

export interface FileType {
    id: number,
    name: string,
    status: 'ready' | 'uploading' | 'success' | 'error' | 'cancel'
    size: number,
    percent: number,
    file: File,
    response?: any,
}
type FileTypeKeys = keyof FileType

export interface UploadProps {
    action: string
    defalutFileList?: FileType[]
    multiple?: boolean
    cookie?: boolean
    drag?: boolean
    progress?: boolean
    headers?: { [key: string]: any }
    data?: { [key: string]: any }
    accept?: string
    beforeUpload?: (file: FileType) => boolean
    onChange?: (fileData: FileType) => void
    onProgress?: (fileData: FileType) => void
    onSuccess?: (fileData: FileType) => void
    onError?: (fileData: FileType) => void
    onRemove?: (fileData: FileType) => void
}

const Upload: React.FC<UploadProps> = props => {
    const
        {
            action,
            defalutFileList = [],
            multiple,
            accept,
            cookie,
            drag = false,
            progress = false,
            data = {},
            headers = {},
        } = props,
        {
            beforeUpload,
            onChange,
            onProgress,
            onSuccess,
            onError,
            onRemove,
        } = props,
        inputRef = useRef<HTMLInputElement>(null),
        [fileList, setFileList] = useState<FileType[]>(defalutFileList),
        __setFileList = useCallback((id: number, obj: Partial<FileType>, cb?: (file: FileType) => void): void => {
            setFileList(old => {
                const
                    index = old.findIndex(f => f.id === id),
                    newValue = [...old]
                newValue[index] = { ...newValue[index], ...obj }
                cb && cb(newValue[index])
                onChange && onChange(newValue[index])
                return newValue
            })
        }, [onChange]),
        wrapClickHandle = useCallback(() => {
            if (inputRef.current) inputRef.current.click()
        }, [inputRef]),
        inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target
            processFiles(files)
            e.target.files = null
        },
        fileRemoveHandle = useCallback((index: number) => {
            const
                newFileList = [...fileList],
                removeItem = newFileList.splice(index, 1)[0]
            setFileList(newFileList)
            onRemove && onRemove(removeItem)
        }, [fileList, onRemove]),
        postFileToAction = useCallback((file: FileType) => {
            const formDate = new FormData()
            formDate.append(file.name, file.file)
            for (const key of Object.keys(data)) {
                formDate.append(key, data[key])
            }
            axios({
                url: action,
                method: 'POST',
                withCredentials: cookie,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...headers,
                },
                data: formDate,
                onUploadProgress(e) {
                    const
                        { loaded, total } = e,
                        percent = { percent: loaded / total * 0.6 || 0, status: 'uploading' } as FileType
                    __setFileList(file.id, percent, file => onProgress && onProgress(file))
                },
                onDownloadProgress(e) {
                    const
                        { loaded, total } = e,
                        percent = { percent: loaded / total * 0.4 + 0.6 || 0 }
                    __setFileList(file.id, percent, file => onProgress && onProgress(file))
                }
            }).then(res => {
                onSuccess && onSuccess(res.data)
                __setFileList(file.id, {
                    status: 'success',
                    response: res,
                })
            }).catch(reason => {
                onError && onError(reason)
                __setFileList(file.id, {
                    status: 'error',
                    response: reason,
                })
                console.log(reason)
            })
        }, [__setFileList, action, cookie, data, headers, onError, onProgress, onSuccess]),
        processFiles = useCallback((files: FileList | null) => {
            if (files) {
                const formatFiles: FileType[] = Array.from(files).map(file => {
                    const fileValue: FileType = {
                        id: Date.now(),
                        status: 'ready',
                        percent: 0,
                        name: file.name,
                        size: file.size,
                        file: file,
                    }
                    onChange && onChange(fileValue)
                    if (beforeUpload) {
                        if (beforeUpload(fileValue))
                            postFileToAction(fileValue)
                        else {
                            fileValue.status = 'cancel'
                        }
                    } else postFileToAction(fileValue)
                    return fileValue
                })
                setFileList((old) => [...old, ...formatFiles])
            }
        }, [onChange, beforeUpload, postFileToAction])

    return (
        <div className='auvo-upload'>
            {
                drag
                    ? <Dragger onFiles={processFiles} />
                    : <Button onClick={wrapClickHandle} btnType='primary'>上传文件</Button>
            }
            <input
                multiple={multiple}
                type='file'
                ref={inputRef}
                accept={accept}
                className='auvo-upload-input'
                onChange={inputChangeHandle}
            />
            <FileList
                progress={progress}
                fileList={fileList}
                onRemove={fileRemoveHandle}
            />
        </div>
    )
}

export default React.memo(Upload)