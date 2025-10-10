import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'

interface IEffect {
    before?: <T>(params?: T) => boolean
    after?: (...args: any[]) => void
}

let _useI18n: ReturnType<typeof useI18n> | any

/**
 * 删除确认
 *
 * @param callback Function
 * @param effect { before?: <T>(params?: T) => boolean, after?: Function } | Function 副操作，callback 之后执行
 */
export function useDeleteConfirm(callback: (...args: any[]) => Promise<void> | void, effect?: IEffect | ((...args: any[]) => void)) {
    if (!_useI18n) _useI18n = useI18n()

    const { t } = _useI18n
    const { before, after } = typeof effect === 'function'
        ? { before: null, after: effect }
        : (effect || {}) as IEffect

    return (...args: any) => {
        const showMessage = before?.(...args)

        if (showMessage === false) {
            ElMessage({
                message: t('deleteAction.noData'),
                type: 'warning',
            })
            return
        }

        ElMessageBox.confirm(t('deleteAction.confirm'), t('notice.title[1]'), {
            type: 'warning',
        })
            .then(async () => {
                await callback(...args)
                after?.(...args)
                ElMessage.success(t('notice.deleted'))
            })
            .catch(() => {

            })
    }
}
