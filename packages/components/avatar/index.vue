<template>
    <zs-header-user :avatar="user?.userInfo?.avatar" :name="user?.userInfo?.name" :dropdown="dropdown" />

    <el-dialog
        v-model="openChangePasswordDialog" width="400" :title="$t('system.setPassword')" :align-center="true"
        :close-on-click-modal="ifCanLogin" :close-on-press-escape="ifCanLogin" :show-close="ifCanLogin"
        @close="cancelChangePassword"
    >
        <el-form
            ref="passwordFormRef" :rules="rules" :model="changePasswordForm" label-width="auto"
            style="max-width: 400px;"
        >
            <el-form-item :label="$t('system.PasswordOne')" prop="password">
                <el-input v-model="changePasswordForm.password" minlength="8" maxlength="20" type="password" show-password />
            </el-form-item>
            <el-form-item :label="$t('system.PasswordTwo')" prop="passwordOne">
                <el-input v-model="changePasswordForm.passwordOne" minlength="8" maxlength="20" type="password" show-password />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelChangePassword">
                    {{ $t('cancel') }}
                </el-button>
                <el-button type="primary" @click="changePasswordFn">
                    {{ $t('confirm') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { changePassword, logout } from '@packages/api'
import { loginStore, useUserStore } from '@packages/stores'

import { removeAccessToken } from '@packages/utils'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import type { FormRules } from 'element-plus'

const { t } = useI18n()

const router = useRouter()
const useLoginStore = loginStore()
const user = useUserStore()

const openChangePasswordDialog = ref<boolean>(false)
const ifCanLogin = ref<boolean>(false)
const passwordFormRef = ref()
const changePasswordForm = reactive({
    password: '',
    passwordOne: '',
})

const passRule = /^[^\u4E00-\u9FA5\u3000-\u303F\uFF00-\uFFEF]*$/
const rules = reactive<FormRules<any>>({
    password: [
        {
            required: true,
            message: t('system.newPassword'),
            trigger: 'blur',
        },
        {
            validator: (_rule, value, callback) => {
                if (!passRule.test(value)) {
                    callback(new Error(t('system.cannotIncludeChinese')))
                } else if (value.length < 8) {
                    callback(new Error(t('system.minPasswordLength')))
                } else if (value.length > 20) {
                    callback(new Error(t('system.maxPasswordLength')))
                } else if (value !== changePasswordForm.passwordOne) {
                    callback(new Error(t('system.inconsistentPasswords')))
                } else {
                    callback()
                }
            },
            trigger: ['blur', 'change'],
        },
    ],
    passwordOne: [
        {
            required: true,
            message: t('system.repeatPassword'),
            trigger: 'blur',
        },
        {
            validator: (_rule, value, callback) => {
                if (!passRule.test(value)) {
                    callback(new Error(t('system.cannotIncludeChinese')))
                } else if (value.length < 8) {
                    callback(new Error(t('system.minPasswordLength')))
                } else if (value.length > 20) {
                    callback(new Error(t('system.maxPasswordLength')))
                } else if (value !== changePasswordForm.password) {
                    callback(new Error(t('system.inconsistentPasswords')))
                } else {
                    callback()
                }
            },
            trigger: ['blur', 'change'],
        },
    ],
})

const dropdown = [
    {
        text: '退出登录',
        trigger: sendLogout,
    },
    {
        text: '修改密码',
        trigger: () => {
            openChangePasswordDialog.value = true
        },
    },
]

const loginStatus = computed(() => useLoginStore.loginStatus)
const seesionloginStatus = computed(() => sessionStorage.getItem('STATUS'))
const IS_FIRST_LOGIN = ref('0')

watch(
    () => changePasswordForm.password,
    () => {
        validateField('passwordOne')
    },
)

watch(
    () => changePasswordForm.passwordOne,
    () => {
        validateField('password')
    },
)

function validateField(prop: string) {
    if (passwordFormRef.value) {
        passwordFormRef.value.validateField(prop)
    }
}

async function sendLogout() {
    const { data } = await logout()

    removeAccessToken()
    window.location.href = data.logoutUrl
}

function cancelChangePassword() {
    if (
        // eslint-disable-next-line eqeqeq
        loginStatus.value == IS_FIRST_LOGIN.value
        // eslint-disable-next-line eqeqeq
        || (seesionloginStatus.value && seesionloginStatus.value == IS_FIRST_LOGIN.value)
    ) {
        ElMessage.error(t('system.firstLogin'))
    } else {
        changePasswordForm.password = ''
        changePasswordForm.passwordOne = ''
        openChangePasswordDialog.value = false
        passwordFormRef.value.clearValidate()
        passwordFormRef.value.resetFields()
    }
}

async function changePasswordFn() {
    if (changePasswordForm.password === '' || changePasswordForm.passwordOne === '') {
        ElMessage.error(t('system.passassword'))
        return
    }
    if (changePasswordForm.password === changePasswordForm.passwordOne) {
        changePassword(changePasswordForm).then((res: any) => {
            if (res.code === 200) {
                logout().then((res: any) => {
                    const { code } = res
                    if (code === 200) {
                        router.push('/login')
                        ElMessage.success(t('system.changePasswordSuccess'))
                    }
                })
                // openChangePasswordDialog.value = false
                // router.push('/login')
                // ElMessage.success(t('system.changePasswordSuccess'))
            } else {
                ElMessage.error(t('system.inconsistentPasswords'))
            }
        })
    }
}
</script>
