export interface ProductFilters {
  page?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  search?: string
  color?: string
  categoryId?: number
  isActive?: boolean
  inStock?: boolean
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}
