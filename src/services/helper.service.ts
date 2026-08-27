import { type NextFunction, type Request, type Response } from "express"
import { envs } from "./environment.service.js"

type SortOrderKey = keyof typeof envs.sortOrders

export const prettyError = (e: any) => ({ success: false, error: e.error.sqlMessage || e.error.message || e.error || e })

export const matchRegex = (str: String, pattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[89AB][a-f0-9]{3}-[a-f0-9]{12}$/i) => RegExp(pattern).exec(`'${str}'`)

export const matchParamRegex = (params: string[] = [], pattern?: RegExp) => {
    return (req: Request, res: Response, next: NextFunction) => {

        for (const param of params) {
            if (!req.params[param]) {
                if (envs.systemLogs == 'true') console.error('param not in req.params')
                return res.status(422).json({ success: false, error: `Invalid Request! Unknown variable '${param}' in the request URL params` })
            }

            if (!matchRegex(req.params[param].toString(), pattern)) {
                if (envs.systemLogs == 'true') console.error('regex not matching, skipping to next route')
                return next('route')
            }
        }
        if (envs.systemLogs == 'true') console.log('param regex matched, moving to route handler method')
        next()
    }
}

export const registerParamValidator = (pattern: RegExp = envs.uuid_regex_pattern) => {
    return (req: Request, res: Response, next: NextFunction, value: string, name: string) => {
        if (!matchRegex(value, pattern)) {
            if (envs.systemLogs === 'true') console.error(`param '${name}' failed regex validation`)
            return res.status(422).json({ success: false, error: `Invalid value for '${name}'` })
        }
        next()
    }
}

export const applyPagination = (page: any, pageSize: any) => {
    const limit = parseInt(pageSize)
    const pg = parseInt(page)
    return ({ ...(!isNaN(limit) && { limit }), ...(!isNaN(limit) && !isNaN(pg) && { offset: (pg - 1) * limit }) })
}

export const applySort = (sort: "latest" | "oldest" | "az" | "za" | any, columnName: string, tieBreaker?: string) => {
    if (!sort) return {}
    const orderBy: any = {}
    switch (sort) {
        case 'az':
            orderBy[columnName] = 'asc'
            if (tieBreaker) orderBy[tieBreaker] = 'asc'
            return { orderBy }
        case 'za':
            orderBy[columnName] = 'desc'
            if (tieBreaker) orderBy[tieBreaker] = 'desc'
            return { orderBy }
        case 'oldest':
            orderBy['createdOn'] = 'asc'
            if (tieBreaker) orderBy[tieBreaker] = 'asc'
            return { orderBy }
        case 'latest':
        default:
            orderBy['createdOn'] = 'desc'
            if (tieBreaker) orderBy[tieBreaker] = 'desc'
            return { orderBy }
    }
}

export const parseSortParam = (sortParam: string | undefined | null): Record<string, string> => {
    if (!sortParam) return {}

    const sort: Record<string, string> = {}

    for (const pair of sortParam.split(',')) {
        const [field, order] = pair.split(':').map(s => s?.trim())
        if (field && order) sort[field] = order
    }

    return sort
}

const isValidSortValue = (val: unknown): val is SortOrderKey => typeof val === 'string' && val in envs.sortOrders

export const prepareSort = (sort: Record<string, unknown> | undefined | null) => {
    if (!sort || !Object.keys(sort).length) return {}

    const orderBy: Record<string, 'asc' | 'desc'> = {}

    for (const key of Object.keys(sort)) {
        const val = sort[key]
        if (isValidSortValue(val)) {
            orderBy[key] = envs.sortOrders[val]
        }
    }

    return Object.keys(orderBy).length ? { orderBy } : {}
}

export const applySearch = (search: string | any, columns: any[] = []) => {
    if (!search) return {}
    const or = []
    for (let i = 0; i < columns.length; i++) {
        or.push({ [columns[i]]: { like: `#${search}` } })
    }
    return { or }
}

export const applyRange = (range: 'week' | 'month' | 'year' | any, column: string) => {
    switch (range) {
        case 'week':
            return {
                date: {
                    value: column,
                    format: 'w Y',
                    compare: {
                        eq: {
                            date: {
                                value: 'currentDate',
                                format: 'w Y'
                            }
                        }
                    }
                }
            }
        case 'month':
            return {
                date: {
                    value: column,
                    format: 'M Y',
                    compare: {
                        eq: {
                            date: {
                                value: 'currentDate',
                                format: 'M Y'
                            }
                        }
                    }
                }
            }
        case 'year':
            return {
                date: {
                    value: column,
                    format: 'Y',
                    compare: {
                        eq: {
                            date: {
                                value: 'currentDate',
                                format: 'Y'
                                // sub: '1y'
                            }
                        }
                    }
                }
            }
        default:
            return {}
    }
}

export const applyFilters = (filters: any) => {
    console.dir(filters, { depth: null, colors: true })
    const condition: any = {}
    const entries: any = Object.entries(filters)
    for (let i = 0; i < entries.length; i++) {
        if (!entries[i][1]) continue
        console.log('filterName', entries[i][0])
        condition[entries[i][0]] = entries[i][1].split(',').map((filter: any) => Number(filter) ? filter : `#${filter}`) || []
    }
    console.log('condition after filter', condition)
    return condition
}