import type { RouteType } from "~/types/route";
import { AppendIndex } from "../pages/append/appendIndex";

export function meta({}: RouteType['MetaArgs']) {
  return [
    { title: "文本拼接" },
    { name: "description", content: "上下/左右 拼接文本" },
  ];
}

export default function AppendPage() {
  return <AppendIndex />;
}