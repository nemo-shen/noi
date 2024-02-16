import { ref, type Ref } from 'vue'

/**
 * TODO:
 * - [ ] 允许并发上传数量，默认1
 * - [ ] 允许设置失败重传次数，默认0
 */

interface UseUploadOptions {
  url: string
  accept?: string
  maxSize?: number // default infinity
  maxCount?: number // default infinity
}

interface UseUploadFile {
  file: File
  name: string
  ext: string
  data: string | ArrayBuffer
  status: 'ready' | 'uploading' | 'success' | 'error'
  error?: Error
}

interface UseUploadReturn {
  files: Ref<UseUploadFile[]>
  append: (file: File | File[]) => Promise<void>
  upload: (index?: number | number[]) => void
  remove: (index: number | number[]) => UseUploadFile[]
}

interface UploadOptions {
  url: string
  headers?: []
  method?: string
}

// 文件类型默认是 formData 格式，如果是其他的格式需要根据 ContentType 进行处理
const uploadFile = (options: UploadOptions, file: File) => {
  const { url, method = 'POST' } = options

  const formData = new FormData()
  formData.append('file', file)
  return fetch(url, {
    method,
    body: formData,
  })
}

const useFileReader = (file: File): Promise<string | ArrayBuffer> =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(file)
  })

const genUploadFile = async (file: File): Promise<UseUploadFile> => ({
  file,
  name: file.name.split('.')[0],
  ext: file.name.split('.')[1],
  data: await useFileReader(file),
  status: 'ready',
})

export const useUpload = (options: UseUploadOptions): UseUploadReturn => {
  const { url, accept = '', maxSize = Infinity, maxCount = Infinity } = options
  const acceptList = accept.split(',').map((type) => type.trim())
  const files = ref<UseUploadFile[]>([])

  const upload = (index?: number | number[]) => {
    if (index) {
      let uploadIndexes = []
      if (Array.isArray(index)) {
        uploadIndexes = index
      } else {
        uploadIndexes = [index]
      }
      files.value.forEach((file, index) => {
        if (!uploadIndexes.includes(index)) return
        uploadFile({ url }, file.file).then((_result) => {
          file.status = 'success'
        })
      })
    } else {
      files.value.forEach((file, index) => {
        uploadFile({ url }, file.file).then((_result) => {
          file.status = 'success'
        })
      })
    }
  }

  const validFileType = (file: File) => {
    if (accept === '') return true
    return acceptList.some((acceptedType) => {
      if (acceptedType.startsWith('.')) {
        return false
      }
      if (acceptedType.endsWith('/*')) {
        return file.type.startsWith(acceptedType.replace('/*', ''))
      }
      return file.type === acceptedType
    })
  }

  const append = async (file: File | File[] | FileList) => {
    let appendFiles = []
    if (file instanceof FileList) {
      appendFiles = Array.from(file)
    } else if (Array.isArray(file)) {
      appendFiles = file
    } else if (file instanceof File) {
      appendFiles = [file]
    } else {
      // nothing
    }
    // check max size
    if (files.value.length + appendFiles.length > maxCount) {
      throw new Error('Exceed the maximum number of files.')
    }
    if (!(appendFiles as File[]).every(validFileType)) {
      throw new Error('Invalid file type.')
    }
    if (!(appendFiles as File[]).every((f) => f.size <= maxSize)) {
      throw new Error('Have some File size exceed.')
    }

    files.value = [
      ...files.value,
      ...(await Promise.all(
        (appendFiles as File[]).map(async (f) => genUploadFile(f))
      )),
    ]
  }

  const remove = (index: number | number[]): UseUploadFile[] => {
    let removeIndexes = []
    if (Array.isArray(index)) {
      removeIndexes = index
    } else {
      removeIndexes = [index]
    }
    if (
      !removeIndexes.every((i) => {
        return i < files.value.length
      })
    ) {
      throw new Error('Have a index out of range.')
    }
    if (Array.isArray(index)) {
      const removeFiles = files.value.filter((_, i) => index.includes(i))
      files.value = files.value.filter((_, i) => !index.includes(i))
      return removeFiles
    }
    return files.value.splice(index, 1)
  }

  return {
    files,
    upload,
    append,
    remove,
  }
}
