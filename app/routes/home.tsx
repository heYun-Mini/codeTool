import type { RouteType } from "~/types/route";
import { NavigationPanel } from "../components/NavigationPanel";

export function meta({}: RouteType['MetaArgs']) {
  return [
    { title: "codeTool首页" },
    { name: "description", content: "Welcome to codeTool!" },
  ];
}

export default function Home() {
  return <NavigationPanel />;
}
