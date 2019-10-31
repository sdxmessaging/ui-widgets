import { IConfig } from "./interface/config";
export declare const confMap: IConfig;
export declare const config: Readonly<IConfig>;
export declare function updateConfig(newConfig: Partial<IConfig>): void;
