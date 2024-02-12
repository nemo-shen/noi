import { ref } from 'vue'

interface UseUploadOptions {
  url: string
  multiple?: boolean
  accept?: string
}

interface UseUploadReturn {
  upload: () => void
  append: (file: File | File[]) => void
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

export const useUpload = (options: UseUploadOptions): UseUploadReturn => {
  const { url, multiple = false, accept = '' } = options
  const acceptList = accept.split(',').map((type) => type.trim())
  const files = ref<File[]>([])

  const upload = () => {
    const result = files.value.map((file) => uploadFile({ url }, file))
    Promise.all(result).then((res) => {
      console.log(res)
    })
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

  const append = (file: File | File[]) => {
    if (!multiple && Array.isArray(file)) {
      console.warn(
        'if you want upload multiple files, set options multiple is `true`'
      )
    }
    if (multiple) {
      if (!(file as File[]).every(validFileType)) {
        throw new Error("Have some File reject");
      }
      files.value = [...files.value, ...(file as File[])]
    } else {
      if (!validFileType(file as File)) {
        throw new Error("File type reject.");
      }
      files.value.push(file as File)
    }
  }

  return {
    upload,
    append,
  }
}
