import { getBrowserLang, i18n } from '@packages/locales'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { AxiosError, RequestConfig } from 'axios'
import { getAccessToken, removeAccessToken } from './storage'

let alertInit = false
const api = axios.create({
    headers: {
        'Accept-Language': getBrowserLang(),
    },
})

api.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken()

        config.headers.authorization = accessToken.authorization
        config.headers.sessionId = accessToken.sessionId

        return config
    },
    error => Promise.reject(error),
)

api.interceptors.response.use(
    async (response) => {
        const res = response.data
        const config = response.config as RequestConfig
        const { defaultResponse } = config.meta ?? {}
        const t = (await i18n()).global.t as any

        if (res.code === 200) {
            // 判断是否返回默认的响应数据
            return defaultResponse ? response : res
        }

        // 处理token失效或者异地登录
        if ([11020, 11021].includes(res.code)) {
            if (!alertInit) {
                alertInit = true
                ElMessageBox.alert(res.msg, t('notice.title[1]'), {
                    confirmButtonText: t('notice.reLogin'),
                    showClose: false,
                    type: 'warning',
                }).then(() => {
                    alertInit = false
                    removeAccessToken()
                    location.href = `${import.meta.env.VITE_SSO_URL}/login`
                })
            }
            return Promise.reject(res)
        }

        ElMessage.error(`【${res.code}】${res.msg} ` || t('notice.unknownError'))
        return Promise.reject(res)
    },
    async (error: AxiosError) => {
        const t = (await i18n()).global.t as any

        if (error.response) {
            const { data = {} } = error.response as any
            ElMessage.error(`【${data.code}】${data.msg}`)
        } else if (error.code === 'ERR_NETWORK') {
            ElMessage.error(t('notice.networkUnavailable'))
        } else {
            ElMessage.error(t('notice.unknownError'))
        }

        return Promise.reject(error)
    },
)

export default api
