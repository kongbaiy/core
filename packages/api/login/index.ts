import { api } from '@packages/utils'

import type {
    ILogin,
} from './index.interface'

/**
 * 登录
 */
export const login = (params: ILogin) => api.post('/sso/web/user/login', params)

/**
 * 退出登录
 */
export const logout = () => api.get('/sso/organ/logout')

/**
 * 获取用户信息
 */
export const getUserInfo = () => api.get('/sso/manage/1.0/CldSysUser/getUserInformation')

/**
 * 获取域名
 */
export const getDomainName = () => api.get('/system/file/1.0/upload/domainName')

/**
 * 机构获取所有服务
 */
export const getApply = () => api.get('/sso/manage/1.0/CldSysRoute/orgAllRoute')

/**
 * 修改密码
 */
export const changePassword = (params: any) => api.post(`/organization//manage/1.0/orgUser/resetPasswordOnline`, params)
