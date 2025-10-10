/**
 *
 * @param queryTime  需要处理的时间
 * @returns 返回一个处理好的时间
 */

import moment from 'moment'

export function resetTimeHooks(queryTime: string | Date) {
    if (!queryTime) return queryTime
    const now = moment()
    const inputDate = moment(queryTime)
    const diffDays = now.diff(inputDate, 'days')

    if (diffDays === 0) {
        return `今天 ${inputDate.format('HH:mm')}`
    } else if (diffDays === 1) {
        return `昨天 ${inputDate.format('HH:mm')}`
    } else if (diffDays <= 7) {
        return `${diffDays}天前`
    } else if (diffDays <= 30) {
        const weeks = Math.floor(diffDays / 7)
        return weeks === 1 ? `1周前` : `${weeks}周前`
    } else if (diffDays <= 90) {
        const weeks = Math.floor(diffDays / 30)
        return weeks === 1 ? `1月前` : `${weeks}月前`
    } else {
        return ''
    }
}
