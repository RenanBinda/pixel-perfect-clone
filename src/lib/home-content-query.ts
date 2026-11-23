import { queryOptions } from "@tanstack/react-query";
import { readHomeContent } from "./home-content.functions";
export const homeContentQuery = queryOptions({ queryKey: ["home-content"], queryFn: () => readHomeContent(), staleTime: 30000 });
