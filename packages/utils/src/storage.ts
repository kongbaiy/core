import { ACCESS_TOKEN_KEY } from '@packages/enums'

/**
 * 获取用户访问令牌
 */
export function setAccessToken(value: any) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, value)
}

/**
 * 获取用户访问令牌
 */
export function getAccessToken() {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY) || '{}'
    return JSON.parse(token)
}

/**
 * 清除用户访问令牌
 */
export function removeAccessToken() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
}
