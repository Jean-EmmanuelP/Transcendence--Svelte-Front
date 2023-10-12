import { TestingStore } from "../plugins/houdini-svelte/stores/Testing";
import type { Cache as InternalCache } from "./cache/cache";
import type { CacheTypeDef } from "./generated";
import { Cache } from "./public";
export * from "./client";
export * from "./lib";
export function graphql(str: "query Testing {\n    testingConnexion\n}"): TestingStore;
export declare function graphql<_Payload>(str: TemplateStringsArray): _Payload;
export declare const cache: Cache<CacheTypeDef>;
export declare function getCache(): InternalCache;