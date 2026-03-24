import { type RouteConfig, index, route } from "@react-router/dev/routes";
// index("some/path", "./some/file.tsx")
//  pattern ^           ^ module file
export default [
    index("routes/home.tsx"),
    route("ekpcode", "routes/ekpcodeRoutes.tsx"),
    route("split","routes/splitRoutes.tsx"),
    route("append","routes/appendRoutes.tsx") 
] satisfies RouteConfig;
