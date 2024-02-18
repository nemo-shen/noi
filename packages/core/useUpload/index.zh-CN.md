# UseUpload

上传文件

## 用法

### 基础用法

```ts
<script setup lang="ts">
import { useUpload } from '@noi/core'

const { files, append, upload } = useUpload({ url: '#' })

const onChange = (event) => {
  append(event.target.files)
}
</script>
```

```html
<template>
  {{ files }}
  <input type="file" @change="onChange" multiple />
  <button @click="upload()">上传</button>
</template>
```

### 设置允许上传的文件类型

```ts
<script setup lang="ts">
import { useUpload } from '@noi/core'

const accept = 'image/*'
const { files, append, upload } = useUpload({ url: '#', accept })

const onChange = (event) => {
  append(event.target.files)
}
</script>
```

```html
<template>
  {{ files }}
  <input type="file" @change="onChange" :accept="accept" multiple />
  <button @click="upload()">上传</button>
</template>
```

### 限制上传文件大小

```ts
<script setup lang="ts">
import { useUpload } from '@noi/core'

const { files, append, upload } = useUpload({ url: '#', maxSize: 1000 })

const onChange = (event) => {
  append(event.target.files)
}
</script>
```

```html
<template>
  {{ files }}
  <input type="file" @change="onChange" :accept="accept" multiple />
  <button @click="upload()">上传</button>
</template>
```

### 限制上传文件数量

```ts
<script setup lang="ts">
import { useUpload } from '@noi/core'

const accept = 'image/*'
const { files, append, upload } = useUpload({ url: '#', maxCount: 2 })

const onChange = (event) => {
  append(event.target.files)
}
</script>
```

```html
<template>
  {{ files }}
  <input type="file" @change="onChange" :accept="accept" multiple />
  <button @click="upload()">上传</button>
</template>
```

## 类型定义

### UseUploadOptions

| 名称     | 类型     | 默认值   | 是否必传 | 说明                 |
| -------- | -------- | -------- | -------- | -------------------- |
| url      | _number_ | -        | [x]      | 上传文件的服务器地址 |
| accept   | _string_ | ''       | [ ]      | 允许上传的文件类型   |
| maxSize  | _number_ | Infinity | [ ]      | 最大可上传的文件大小 |
| maxCount | _number_ | Infinity | [ ]      | 最多可上传的文件数量 |

### UseUploadReturn

| 名称   | 类型                                             | 说明               |
| ------ | ------------------------------------------------ | ------------------ |
| files  | _Ref\<UseUploadFile[]\>_                         | 当前添加的文件列表 |
| append | _(file: File \| File[]) => Promise<void>_        | 添加文件方法       |
| upload | _(index: number \| number[]) => void_            | 上传方法           |
| remove | _(index: number \| number[]) => UseUploadFile[]_ | 删除文件方法       |

### UseUploadFile

| 名称   | 类型                                             | 说明                         |
| ------ | ------------------------------------------------ | ---------------------------- |
| file   | _File_                                           | 文件源数据                   |
| name   | _string_                                         | 文件名                       |
| ext    | _string_                                         | 扩展名                       |
| data   | _string \| ArrayBuffer_                          | base64数据，用于图片文件预览 |
| status | _'ready' \| 'uploading' \| 'success' \| 'error'_ | 上传状态                     |
| error  | _Error_                                          | 上传失败原因                 |
