export interface CacheFile {
  path: string
  data?: CacheData
}

interface CacheData {
  session?: string
  updatedAt?: number
}
