/**
 * 匹配中文字母数字
 */
export const ZN_LETTER_NUMBER: RegExp = /^[\u4E00-\u9FA5\w]+$/

/**
 * 匹配 IP
 */
export const IP: RegExp = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})$/
