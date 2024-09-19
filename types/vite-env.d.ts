/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** 核心 API 地址 */
    readonly VITE_BASE_API_URL: string

    /** 核心 API 前缀网关 */
    readonly VITE_BASE_API_PREFIXS: string

    /** 路由模式 */
    readonly VITE_ROUTER_MODE: 'hash' | 'history'

    /** 部署应用打包路径 */
    readonly BASE_PUBLIC_PATH: string

    /** 是否开启sourceMap，true为开启 */
    readonly BUILD_SOURCEMAP: boolean

    /** 开发服务器端口号 */
    readonly DEV_SERVER_PORT: string

    /** 开发服务器启动后打开浏览器，true为开启 */
    readonly DEV_SERVER_OPEN: boolean

    /** 开发环境下默认的登录用户名 */
    readonly VITE_USERNAME: string

    /** 万能登录密码 */
    readonly VITE_PASSWORD: string

    /** 万能手机验证码 */
    readonly VITE_SMS_VERIFY_CODE: string

    /** sso 服务地址 */
    readonly VITE_SSO_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
