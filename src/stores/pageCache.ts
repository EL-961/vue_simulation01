import { reactive } from 'vue'
import type { PageCacheState } from '../types/menu'

const pageCacheMap = reactive(new Map<string, PageCacheState>())

export const getPageCache = (key: string): PageCacheState | undefined => {
    return pageCacheMap.get(key)
}

export const setPageCache = (key: string, cache: PageCacheState): void => {
    pageCacheMap.set(key, cache)
}

export const removePageCache = (key: string): void => {
    pageCacheMap.delete(key)
}

export const clearPageCache = (): void => {
    pageCacheMap.clear()
}