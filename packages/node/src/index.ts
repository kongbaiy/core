import fs from 'node:fs'
import path from 'node:path'

interface IFileDisplayOptions {
    filePath: string
    filterDir: string
}

export async function fileDisplay(options: IFileDisplayOptions, resultCallback: <T>(data: T) => void) {
    const { filePath, filterDir = '' } = options
    const filePaths: string[] = []

    async function exe(filePath: string, filterDir: string) {
        const files = await fs.promises.readdir(filePath)
        for (let i = 0; i < files.length; i++) {
            const filename = files[i]
            const fileDir = path.join(filePath, filename)
            const stats = await fs.promises.stat(fileDir)
            const isDir = stats.isDirectory()

            if (fileDir.includes(filterDir)) return filePaths.push(fileDir)
            if (isDir) await exe(fileDir, filterDir)
        }
    }
    await exe(filePath, filterDir)
    resultCallback?.(filePaths)
}

export const ObjectAttrRegExp = key => new RegExp(`['"]${key}['"].*\\[([\\s\\S]*?)\\]`)

export function replaceJSON(url: string, key: string, value: string) {
    fs.readFile(url, 'utf-8', (error, data) => {
        if (error) return

        const replaceKey = ObjectAttrRegExp(key)
        const newData = data.replace(replaceKey, value)

        fs.writeFile(url, newData, 'utf8', (error) => {
            if (error) console.log(`文件写入失败：`, error)
            console.log('文件替换成功！')
        })
    })
}
