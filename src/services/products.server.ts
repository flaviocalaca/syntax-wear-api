import { Prisma } from '../generated/prisma/client'
import { ProductFilters } from '../types'
import { prisma } from '../utils/prisma'

const sortableFields = ['name', 'price', 'createdAt'] as const

type ProductSortBy = (typeof sortableFields)[number]

const toFiniteNumber = (value: unknown) => {
  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : undefined
}

const toBoolean = (value: unknown) => {
  if (value === true || value === 'true') {
    return true
  }

  if (value === false || value === 'false') {
    return false
  }

  return undefined
}

const isProductSortBy = (value: unknown): value is ProductSortBy =>
  typeof value === 'string' && sortableFields.includes(value as ProductSortBy)

export const getProducts = async (filter: ProductFilters) => {
  const where: Prisma.ProductWhereInput = {
    isActive: toBoolean(filter.isActive) ?? true,
  }
  const priceFilter: Prisma.FloatFilter = {}
  const minPrice = toFiniteNumber(filter.minPrice)
  const maxPrice = toFiniteNumber(filter.maxPrice)
  const categoryId = toFiniteNumber(filter.categoryId)
  const inStock = toBoolean(filter.inStock)
  const search = filter.search?.trim()
  const color = filter.color?.trim()

  if (minPrice !== undefined) {
    priceFilter.gte = minPrice
  }

  if (maxPrice !== undefined) {
    priceFilter.lte = maxPrice
  }

  if (Object.keys(priceFilter).length > 0) {
    where.price = priceFilter
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (color) {
    where.color = { equals: color, mode: 'insensitive' }
  }

  if (categoryId !== undefined) {
    where.categoryId = categoryId
  }

  if (inStock) {
    where.stock = { gt: 0 }
  }

  const page = Math.max(1, toFiniteNumber(filter.page) ?? 1)
  const limit = Math.min(100, Math.max(1, toFiniteNumber(filter.limit) ?? 20))
  const sortBy = isProductSortBy(filter.sortBy) ? filter.sortBy : 'createdAt'
  const sortOrder = filter.sortOrder === 'asc' ? 'asc' : 'desc'
  const orderBy: Prisma.ProductOrderByWithRelationInput = {
    [sortBy]: sortOrder,
  }

  return prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
  })
}
