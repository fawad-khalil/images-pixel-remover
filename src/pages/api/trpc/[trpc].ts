import { appRouter } from "@/server/routers/_app";
import { createNextApiHandler } from "@trpc/server/adapters/next";
// import { createContext } from "~/server/context";
// import { appRouter } from "../";

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
