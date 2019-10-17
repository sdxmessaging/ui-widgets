import { IConfig, TConfig } from "./interface/config";
export declare const confMap: IConfig;
export declare const config: TConfig;
export declare function updateConfig(newConfig: Partial<IConfig>): void;
