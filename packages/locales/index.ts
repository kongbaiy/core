import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

const langMap: AnyObject = {
    // eslint-disable-next-line style/quote-props
    zh: 'zh-hans',
    'zh-CN': 'zh-hans',
    'zh-TW': 'zh-hant',
    'zh-HK': 'zh-hant',
}

export function getBrowserLang() {
    return langMap[navigator.language] || 'en'
}

export async function getLocale() {
    const fileName = getBrowserLang()
    const locales = await import(`./src/${fileName}.ts`)

    return locales.default
}

export async function i18n(messages?: AnyObject): Promise<ReturnType<typeof createI18n>> {
    const locale = getBrowserLang()
    const message = await getLocale()

    return createI18n({
        locale,
        legacy: false,
        fallbackLocale: 'zh-hans',
        messages: {
            [locale]: {
                ...message,
                ...messages,
            },
        },
    })
}

export async function setupI18n(app: App, messages?: AnyObject): Promise<void> {
    const _i18n = await i18n(messages)

    app.use(_i18n)
}

export const t = (key: string) => key
