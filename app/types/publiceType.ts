/**
 * 公共类型
 */

// 页码搜索
export interface SearchPageInterface {
  page: number;
  limit: number;
}

// 网络请求列表分页接口 API层
export interface ReturnListInterface<T = unknown> {
  content: T;
  totalElements: number;
  totalPages: number;
}

// 页面网络请求返回接口 UI层
export interface ReturnPageList<T = unknown, F = unknown> extends SearchPageInterface {
  total: number;
  tableData: T; // 表格数据类型
  formSearch: F; // 表单数据类型
}
