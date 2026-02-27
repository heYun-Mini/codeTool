import type { RouteType } from "~/types/route";
import { SplitIndex } from "../pages/split/splitIndex";

export function meta({}: RouteType['MetaArgs']) {
  return [
    { title: "文本分割与填充" },
    { name: "description", content: "快速分割文本、添加前后缀、去除空格的在线工具" },
  ];
}

export default function SplitPage() {
  return <SplitIndex />;
}