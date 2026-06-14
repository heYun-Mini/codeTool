import type { RouteType } from "~/types/route";
import { MkReact } from "../pages/mkReact/mkReact";

export function meta({}: RouteType['MetaArgs']) {
  return [
    { title: "生成 React 代码" },
    { name: "description", content: "快速生成 React 代码的在线工具" },
  ];
}

export default function MkReactPage() {
  return <MkReact />;
}