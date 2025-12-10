export interface PaginatedResponse<ResultType> {
    results: ResultType[]
    total: number
}