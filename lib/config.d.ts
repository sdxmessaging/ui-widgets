import { IConfig } from "./interface/config";
export declare const config: Readonly<IConfig>;
export declare function updateConfig(newConfig: Partial<IConfig>): void;
export declare function getConfig<T extends keyof IConfig>(key: T, override?: Partial<IConfig>): IConfig[T];
