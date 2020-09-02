/** 字典列表查询参数 */
export interface DictionaryListQueryParams extends PaginationParams {
  /** 查询关键字 */
  keyword?: string;
}

/** 字典目录Form */
export interface DictionaryForm {
  /** 字典编码 */
  code: string;
  /** 字典名称 */
  name: string;
  /** 字典描述 */
  desc?: string;
}

/** 字典内容Form */
export interface DictionaryContentForm {
  /** 内容编码 */
  code: string;
  /** 内容名称 */
  name: string;
}
