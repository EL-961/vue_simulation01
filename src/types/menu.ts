export type ViewType = 'table' | 'columns' | 'detail' | 'json' | 'health'

export interface ColumnItem {
    label: string
    prop: string
}

export interface MenuItem {
    title: string
    key: string
    view: ViewType
    api: string
    tbl?: string
    fields?: string
    columns?: ColumnItem[]
}

export interface MenuGroup {
    title: string
    key: string
    children: MenuItem[]
}

export type GenericRow = Record<string, unknown>

export interface ApiListResult<T = GenericRow> {
    records?: T[]
    total?: number
    pageNo?: number
    pageSize?: number
}

export interface ApiListResponse<T = GenericRow> {
    success?: boolean
    code?: number
    message?: string
    result?: ApiListResult<T>
}

/** 通用页面缓存基类 */
export interface BasePageCache {
    loaded: boolean
    scrollTop?: number
    scrollLeft?: number
    updatedAt?: number
}

/** table 页面缓存 */
export interface TablePageCache<T = GenericRow> {
    view: 'table'
    loaded: boolean
    rows: T[]
    total: number
    pageNo: number
    pageSize: number
    updatedAt?: number
}

/** columns 页面缓存 */
export interface ColumnsPageCache<T = GenericRow> {
    view: 'columns'
    loaded: boolean
    rows: T[]
    updatedAt?: number
}

/** json 页面缓存 */

export interface JsonPageCache {
    view: 'json'
    loaded: boolean
    jsonText: string
    updatedAt?: number
}

/** health 页面缓存 */
export interface HealthPageCache {
    view: 'health'
    loaded: boolean
    healthData: unknown
    lastUpdateTime?: string
    updatedAt?: number
}

/** detail 页面缓存 */
export interface DetailPageCache<T = GenericRow> extends BasePageCache {
    view: 'detail'
    queryId: string
    detailData: T | null
}

/** 所有页面缓存联合类型 */
export type PageCacheState<T = GenericRow> =
    | TablePageCache<T>
    | ColumnsPageCache<T>
    | JsonPageCache
    | HealthPageCache
    | DetailPageCache<T>