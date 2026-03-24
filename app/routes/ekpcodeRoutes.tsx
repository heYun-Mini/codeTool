import type { RouteType } from "~/types/route";
import { Index } from "../ekpcode/ekpcodeIndex";

export function meta({}: RouteType['MetaArgs']) {
  return [
    { title: "ekp代码生成" },
    { name: "description", content: "Welcome to ekp代码生成!" },
  ];
}

export default function Home() {
  return <Index />;
}