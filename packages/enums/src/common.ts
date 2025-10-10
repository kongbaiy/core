export enum LOGIN_TYPE {
    CODE = 'CODE',
    ACCOUNT = 'ACCOUNT',
}

export enum LENGTH_LIMIT {
  MIN_11 = 11,
  // eslint-disable-next-line ts/no-duplicate-enum-values
  MAX_11 = 11,
  MIN_18 = 18,
  // eslint-disable-next-line ts/no-duplicate-enum-values
  MAX_18 = 18,
  MIN_15 = 15,
  // eslint-disable-next-line ts/no-duplicate-enum-values
  MAX_15 = 15,
}

// 节点基础类型
export enum HAS_FEILD {
    LABEL = 'label',
    VALUE = 'value',
    CHILDREN = 'children',
    LEAF = 'leaf',
  }
