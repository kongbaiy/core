import { getDomainName, getUserInfo } from '@packages/api'
import { getAccessToken, setAccessToken } from '@packages/utils'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('enum', () => {
    const userInfo = ref<any>()

    const asyncExecutionContext = async () => {
        const { data } = await getUserInfo()
        const { data: { domainName } } = await getDomainName()
        const currentAccessToken = getAccessToken()

        userInfo.value = data
        setAccessToken({ ...currentAccessToken, domainName, logoutUrl: data.logoutUrl })
    }
    asyncExecutionContext()

    return {
        userInfo,
    }
})
