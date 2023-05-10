export interface IResponse<T> {
  data?: T | null,
  success: boolean,
  totalCount?: number
}
