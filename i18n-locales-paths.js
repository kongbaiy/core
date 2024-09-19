import path from 'node:path'
import { fileDisplay, replaceJSON } from '@packages/node'

 fileDisplay({
    filePath: path.resolve('./apps'),
    filterDir: 'locales',
}, (filePaths) => {
    const newFilePaths = filePaths.map((_path) => {
        const newPath = _path.replace(/\\/g, '/').split('core/')[1]
        return `${newPath}/lang`
    })
    const localesPaths = ['packages/locales/src'].concat(newFilePaths)

    replaceJSON(
        path.resolve('./.vscode/settings.json'),
        'i18n-ally.localesPaths',
        `"i18n-ally.localesPaths": ${JSON.stringify(localesPaths)}`,
    )
})
