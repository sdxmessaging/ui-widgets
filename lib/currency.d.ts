/**
 * ui-widgets currency conversion utils,
 * use with integer values of smallest currency units
 */
export declare class Currency {
    private static formatter;
    /**
     * Format a number into a currency string
     * @param unitTotal total in smallest monetary unit to convert e.g. 12345
     * @param negativeParens whether to format negative numbers with parentheses
     * @param invert interpret postive/negative `unitTotal` as the opposite
     * @return currency string if finite number e.g. "1,234,567.89", "-1.23", "(4.56)", or undefined
     */
    static format(unitTotal: number, negativeParens?: boolean, invert?: boolean): string | undefined;
    /**
     * Parse a currency string into a number
     * @param currencyStr Value to convert e.g. "123.45"
     * @return parsed value as smallest monetary unit e.g. 12345
     */
    static strToNum(currencyStr: string): number;
    /**
     * Convert a number into a currency string
     * @param unitTotal total in smallest monetary unit to convert e.g. 12345
     * @param format whether to format the large number with commas
     * @return currency string if finite number e.g. "123.45" or undefined
     */
    static numtoStr(unitTotal: number, format?: boolean): string | undefined;
    /**
     * Convert a number into a currency string pair
     * @param unitTotal total in smallest monetary unit to convert e.g. 12345
     * @return currency string pair if finite number e.g. ["123", "45"] or undefined
     */
    static numToTuple(unitTotal: number): [number, number] | undefined;
}
