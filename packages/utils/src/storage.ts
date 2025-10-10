import { ACCESS_TOKEN_KEY, PICTURE_SERVICES_URL_KEY } from '@packages/enums'

/**
 * 设置用户访问令牌
 */
export function setAccessToken(value: any) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(value))
}

/**
 * 获取用户访问令牌
 */
export function getAccessToken() {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY)
    return token ? JSON.parse(token) : {}
}

/**
 * 清除用户访问令牌
 */
export function removeAccessToken() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
}

/**
 * 设置图片服务地址
 * @param url 图片服务地址
 * @param platform 平台，默认为 h5
 */
export function setPictureUrl(url: string) {
    sessionStorage.setItem(PICTURE_SERVICES_URL_KEY, url)
}

/**
 * 获取登录地址
 */
export function getLoginPath() {
    return `${import.meta.env.VITE_BASE_API_URL}/login`
}
