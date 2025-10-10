export const pagination: Pagination = {
    page: 1,
    limit: 15,
}

export function useQuery<T = any>(queryData?: T) {
    const queryForm = reactive({
        ...queryData,
        ...pagination,
    })
    const totalCount = ref(0)

    return {
        queryForm: queryForm as T & Pagination,
        totalCount,
    }
}
