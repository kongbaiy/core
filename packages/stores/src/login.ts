import { defineStore } from 'pinia'

export const loginStore = defineStore({
    id: 'login',
    state: () => ({
        loginStatus: '',
    }),
    getters: {
        getLoginStatus: state => state.loginStatus,
    },
    actions: {
        setLoginStatus(status: string) {
            this.loginStatus = status
        },
    },
})
