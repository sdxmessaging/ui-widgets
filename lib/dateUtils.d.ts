import { IField, TPropStream } from "./interface/widget";
export type TDateInputType = "dd" | "mm" | "yyyy" | "yy";
export type TDateType = "day" | "month" | "year";
export declare function dateInputIds(type: TDateType): "dd" | "mm" | "yyyy";
export declare function focusLastInput(dom: Element, id: string, focusedId?: TDateInputType): void;
interface IAdvanceTarget {
    readonly next?: TDateInputType;
    readonly prev?: TDateInputType;
}
export declare function handleRetreatOrLiteralAdvance(id: string, selfType: TDateInputType, streamValue: string, dom: Element, event: KeyboardEvent, literalKey: string, { next, prev }: IAdvanceTarget): void;
export declare function resetInvalidValueStream(valid: boolean, date: string, year: string, month: string, day: string, valueStream: TPropStream): void;
export declare function appendZeroToDayMonth(valueStream: TPropStream): void;
export declare function validDateInputLengths(year: string, month: string, day: string): boolean;
export declare function validateCardDate(year: string, month: string, required: boolean, dom?: Element): boolean;
export declare function validateDate(year: string, month: string, day: string, field: IField, dom?: Element): boolean;
export declare function handleDateChange(streamType: TPropStream, id: string, selfType: TDateInputType, dom: Element, targetType?: TDateInputType): void;
export {};
