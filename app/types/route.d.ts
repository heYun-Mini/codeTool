// 通用 React Router 路由类型定义
export type RouteType = {
  MetaArgs: {
    data: unknown;
    params: Record<string, string>;
    location: Location;
  };
  LoaderData: unknown;
};