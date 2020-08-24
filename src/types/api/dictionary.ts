/** 用户列表查询参数 */
export interface DictionaryListQueryParams extends PaginationParams {
  /** 字典编码 */
  code?: string;
  /** 字典名称 */
  name?: string;
}

export interface DictionaryForm {
  /** 字典编码 */
  code: string;
  /** 字典名称 */
  name: string;
  /** 字典描述 */
  desc?: string;
}
