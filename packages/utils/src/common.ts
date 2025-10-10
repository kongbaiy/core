import { HAS_FEILD, LENGTH_LIMIT } from '@packages/enums'
import type { CascaderNode } from 'element-plus'

type typeIsNull = string | number | boolean | null | undefined

/**
 *
 * @param {number} num 倒计时时间
 * @param {string} text 按钮文本
 * @returns { object } countdownText 倒计时文本 isDisabled 是否禁用 send 发送验证码方法
 * @description 发送验证码倒计时
 */
export function useCountDown(
    num: number,
    text = '发送验证码',
): {
    countdownText: Ref<string>
    isDisabled: Ref<boolean>
    send: () => void
} {
    const countdownNum = ref(num)
    const countdownText = ref(text)
    const isDisabled = ref(false)

    const send = () => {
        countdownText.value = `${countdownNum.value}s`
        isDisabled.value = true

        const timer = setInterval(() => {
            countdownNum.value--
            countdownText.value = `${countdownNum.value}s`

            if (countdownNum.value === 0) {
                clearInterval(timer)
                countdownNum.value = num
                countdownText.value = text
                isDisabled.value = false
            }
        }, 1000)
    }
    return { countdownText, isDisabled, send }
}

function allToString(
    obj: { [key: string]: any },
    splitter?: string,
) {
    let k: string

    for (k in obj) {
        const item = obj[k]
        if (Array.isArray(item)) obj[k] = item.join(splitter)
    }

    return obj
}

/**
 * 对象数组转为字符串
 * @param {object} obj
 * @param {string | string[]} keys
 * @param {string} splitter
 */
export function objectArrayToString(
    obj: { [key: string]: any },
    keys: string | string[],
    splitter?: string,
) {
    const newObj = { ...obj }

    if (keys === '$all') return allToString(newObj, splitter)

    const k = typeof keys === 'string' ? [keys] : keys

    for (let i = 0; i < k.length; i++) {
        const key = k[i]
        const value = newObj[key]?.join(splitter)

        newObj[key] = value
    }

    return newObj
}

/**
 * 防抖
 */
export function debounce(fn: <T>(v: T) => void, delay: number) {
    let time: any = null

    return (value: string) => {
        if (time !== null) {
            clearTimeout(time)
        }

        time = setTimeout(() => {
            fn?.(value)
        }, delay)
    }
}

/**
 *
 * 判断是否移动端
 */
export function isMobileDevice() {
    return /android|iphone|ipad|ipod|ios/i.test(navigator.userAgent)
}

/**
 * input类型验证
 */
export class InputLegalityValidate {
    private _phoneReg: RegExp = /^1[3-9]\d{9}$/
    private _mailReg: RegExp = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    private _idCardReg: RegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}([\dX])$)/i
    /**
     * 验证手机号
     * @param phone 手机号
     */
    phone(phone: string): boolean {
        return this._phoneReg.test(phone)
    }

    /**
     * 验证邮箱
     * @param email 手机号
     */
    email(email: string): boolean {
        return this._mailReg.test(email)
    }

    /**
     * 验证身份证
     * @param idCard 身份证号
     */
    idCard(idCard: string): boolean {
        return this._idCardReg.test(idCard)
    }
}

/**
 * input长度验证
 */
export class InputLengthValidate {
    private validators: { [key: string]: (value: string) => boolean } = {
        // 修改 validators 的 key 类型
        MIN_11: (value: string) => value.length >= LENGTH_LIMIT.MIN_11,
        MAX_11: (value: string) => value.length <= LENGTH_LIMIT.MAX_11,
        MIN_18: (value: string) => value.length >= LENGTH_LIMIT.MIN_18,
        MAX_18: (value: string) => value.length <= LENGTH_LIMIT.MAX_18,
        MIN_15: (value: string) => value.length >= LENGTH_LIMIT.MIN_15,
        MAX_15: (value: string) => value.length <= LENGTH_LIMIT.MAX_15,
    }

    private checkLength(value: string, key: string): boolean {
        // 修改 limit 参数类型
        return this.validators[key](value) // 使用 key 获取 validator
    }

    private maxLength(value: string, limit: number): string {
        if (value.length > limit) {
            return value.slice(0, limit)
        }
        return value
    }

    constructor() {
        for (const key in LENGTH_LIMIT) {
            if (Number.isNaN(Number(key))) {
                const prefix = key.slice(0, 3)
                const num = Number.parseInt(key.slice(4), 10)
                const funcName = `${prefix}${num}`

                    ; (this as any)[funcName] = (value: string) => this.checkLength(value, key) // 传递 key 而不是 limit
            }
        }
    }

    // 新增方法：限制最大长度
    limitLength(value: string, limit: number): string {
        return this.maxLength(value, limit)
    }
}

export function isNull(value: typeIsNull) {
    return (
        value === 'null'
        || value === null
        || value === 'undefined'
        || value === undefined
        || value === ''
        || value === ' '
        || value === '0'
        || value === 0
        || value === 'false'
        || value === false
    )
}
/**
 * 对数型结构进行数据处理和映射关系
 */
type Mapping = Record<string, string>
export class dataHandler {
    private fields: typeof HAS_FEILD
    private node: CascaderNode
    private mapping: Mapping

    // 构造函数，接收三个参数：fields，node，mapping
    constructor(fields: typeof HAS_FEILD, node: CascaderNode, mapping: Mapping) {
        // 将参数fields赋值给实例变量this.fields
        this.fields = fields
        // 将参数node赋值给实例变量this.node
        this.node = node
        this.mapping = mapping
    }

    // 处理过程
    private processNode(node: Record<string, CascaderNode>): CascaderNode {
        Object.values(HAS_FEILD).forEach((field) => {
            if (!(field in node)) {
                const sourceField = Object.keys(this.mapping).find(key => this.mapping[key] === field)
                if (!sourceField) {
                    switch (field) {
                        case HAS_FEILD.LABEL:
                            node[field] = node[this.mapping.label] || ''
                            break
                        case HAS_FEILD.VALUE:
                            node[field] = node[this.mapping.value] || ''
                            break
                        case HAS_FEILD.CHILDREN:
                            node[field] = this.mapping.children as unknown as CascaderNode
                            break
                        case HAS_FEILD.LEAF:
                            node[field] = this.mapping.leaf as unknown as CascaderNode
                            break
                        default:
                            node[field] = null as unknown as CascaderNode
                            break
                    }
                }
            }
        })
        return node as unknown as CascaderNode
    }

    // 递归
    private processAllNodes(node: CascaderNode): CascaderNode {
        const processedNode = this.processNode(node as any)
        if (processedNode[this.fields.CHILDREN] && Array.isArray(processedNode[this.fields.CHILDREN])) {
            processedNode[this.fields.CHILDREN] = processedNode[this.fields.CHILDREN].map(child =>
                this.processAllNodes(child),
            )
        }
        return processedNode
    }

    // getter
    public getProcessedData(): CascaderNode {
        return this.processAllNodes(this.node)
    }
}

interface ISectoralTable {
    address: string
    appletQr: string
    hasChildren?: boolean
    cldOrgDepts?: ISectoralTable[]
    deptAlias: string
    initialPinyin: string
    deptCode: string
    deptName: string
    email: string
    leader: string
    mark: string
    officialQr: string
    orgCode: string
    parentCode: string
    phone: string
    pk: string
    sort: number
    status: number
}

/**
 * @param node 节点
 * @param childPath 子节点路径
 * @returns 构建节点路径的辅助函数
 */
function buildPath(node: ISectoralTable, childPath?: string): string {
    const path = node.deptName + (childPath ? ` -> ${childPath}` : '')
    return path
}

/**
 * @param data 树形数据
 * @param targetDeptCode 子节点DeptCode
 * @returns 查找叶子节点并返回路径
 */
export function findTreeDataNode(data: ISectoralTable[], targetDeptCode: string): string | null {
    for (const node of data) {
        // 如果当前节点的 deptCode 符合目标值
        if (node.deptCode === targetDeptCode) {
            return buildPath(node)
        }

        // 递归查找子节点
        const childPath = findTreeDataNode(node.cldOrgDepts as ISectoralTable[], targetDeptCode)
        if (childPath) {
            return buildPath(node, childPath)
        }
    }

    return null // 如果没有找到，返回 null
}

/**
 * @param dept 树形数据
 * @param queryString 子节点DeptCode
 * @param results 查找结果集
 */
export function findTreeDataNodeName(
    dept: ISectoralTable,
    queryString: string,
    results: ISectoralTable[],
) {
    if (dept.deptName.includes(queryString)) {
        results.push(dept)
    }

    // 如果有子部门，递归查找
    if (dept.cldOrgDepts && dept.cldOrgDepts.length > 0) {
        for (const child of dept.cldOrgDepts) {
            findTreeDataNodeName(child, queryString, results)
        }
    }
}
