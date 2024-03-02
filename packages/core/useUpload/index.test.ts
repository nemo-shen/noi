import { vi, describe, expect, test } from 'vitest'
import { useUpload } from '.'
import { wait } from '../utils'

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  )
)

describe('useUpload', () => {
  test('should be defined', () => {
    expect(useUpload).toBeDefined()
  })

  test('upload file', async () => {
    const { files, append, upload, remove } = useUpload({ url: 'url' })
    expect(files.value.length).toEqual(0)

    await append(new File([''], 'file.txt'))
    expect(files.value.length).toEqual(1)

    upload()
    await wait(100)
    expect(files.value[0].status).toEqual('success')

    remove(0)
    expect(files.value.length).toEqual(0)
  })

  test('append multiple files', async () => {
    const { files, append } = useUpload({ url: '#' })
    expect(files.value.length).toEqual(0)

    await append(new File([''], 'file1.txt'))
    await append(new File([''], 'file2.txt'))
    expect(files.value.length).toEqual(2)

    await append([new File([''], 'file3.txt'), new File([''], 'file4.txt')])
    expect(files.value.length).toEqual(4)
  })

  test('upload all files', async () => {
    const { files, append, upload } = useUpload({ url: '#' })
    await append(new File([''], 'file.txt'))
    await append(new File([''], 'file1.txt'))
    upload()
    await wait(100)
    expect(files.value.every((file) => file.status === 'success')).toBeTruthy()
  })

  test('upload file by index', async () => {
    const { files, append, upload } = useUpload({ url: '#' })
    await append(new File([''], 'file1.txt'))
    await append(new File([''], 'file2.txt'))
    await append(new File([''], 'file3.txt'))
    await append(new File([''], 'file4.txt'))
    await append(new File([''], 'file5.txt'))
    upload(1)
    await wait(100)
    expect(files.value[1].status).toEqual('success')

    upload([2, 3])
    await wait(100)
    expect(files.value[2].status).toEqual('success')
    expect(files.value[3].status).toEqual('success')

    expect(files.value.map((file) => file.status)).toEqual([
      'ready',
      'success',
      'success',
      'success',
      'ready',
    ])
  })

  test('remove', async () => {
    const { files, append, remove } = useUpload({ url: '#' })
    await append(new File([''], 'file1.txt'))
    await append(new File([''], 'file2.txt'))
    await append(new File([''], 'file3.txt'))
    await append(new File([''], 'file4.txt'))
    await append(new File([''], 'file5.txt'))

    expect(files.value.length).toEqual(5)

    remove(1)
    expect(files.value.length).toEqual(4)
    expect(files.value.map((file) => file.name)).toEqual([
      'file1',
      'file3',
      'file4',
      'file5',
    ])

    remove([2, 3])
    expect(files.value.length).toEqual(2)
    expect(files.value.map((file) => file.name)).toEqual(['file1', 'file3'])

    expect(() => remove(2)).toThrow('Index out of range.')
  })

  test('limit file type', async () => {
    const { files, append } = useUpload({
      url: '#',
      accept: 'image/*,text/plain',
    })

    await append(new File([''], 'image-jpg.jpg', { type: 'image/jpg' }))
    await append(new File([''], 'image-png1.png', { type: 'image/png' }))
    expect(
      append(new File([''], 'image-png2.png', { type: '.png' }))
    ).rejects.toThrow('Invalid file type.')
    await append(new File([''], 'file1.txt', { type: 'text/plain' }))
    expect(
      append(new File([''], 'video.mp4', { type: 'video/mp4' }))
    ).rejects.toThrow('Invalid file type.')
    expect(files.value.map((file) => file.name)).toEqual([
      'image-jpg',
      'image-png1',
      'file1',
    ])

    const { append: append2 } = useUpload({
      url: '#',
      accept: '.png',
    })
    expect(
      append2(new File([''], 'image-jpg.jpg', { type: 'image/jpg' }))
    ).rejects.toThrow('Invalid file type.')
    expect(
      append2(new File([''], 'image-png1.png', { type: 'image/png' }))
    ).rejects.toThrow('Invalid file type.')
  })

  test('max-count', async () => {
    const { append } = useUpload({ url: '#', maxCount: 1 })
    expect(
      append([new File([], 'file1.txt'), new File([], 'file2.txt')])
    ).rejects.toThrow('Exceed the maximum number of files.')

    await append(new File([], 'file1.txt'))
    expect(append(new File([], 'file2.txt'))).rejects.toThrow(
      'Exceed the maximum number of files.'
    )
  })

  test('max-size', async () => {
    const { append } = useUpload({ url: '#', maxSize: 100 })
    expect(
      append(new File([new Uint8Array(101).fill(0)], 'file1.txt'))
    ).rejects.toThrow('Have some File size exceed.')
  })
})
