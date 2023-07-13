import m from "mithril";
import { IConfig, TIcon, TWidgetFunction } from "./interface/config";
export declare const config: Readonly<IConfig>;
export declare function updateConfig(newConfig: Partial<IConfig>): void;
export declare function getConfig<T extends keyof IConfig>(key: T, override?: Partial<IConfig>): Readonly<IConfig>[T];
export declare function registerFunction(name: string, func: TWidgetFunction): void;
export declare function getFunction(name: string): TWidgetFunction;
export declare function getIcon(icon: TIcon, classes: string): m.Children;
