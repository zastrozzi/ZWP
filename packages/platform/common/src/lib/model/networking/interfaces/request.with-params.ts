export interface RequestWithParams<PathParams = null, QueryParams = null, RequestBody = null> {
    path: PathParams
    query: QueryParams
    body: RequestBody
}