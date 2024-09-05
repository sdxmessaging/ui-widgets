import { DateTime } from "luxon";

import { IField, TPropStream } from "./interface/widget";

export type TDateInputType = "dd" | "mm" | "yyyy" | "yy";
export type TDateType = 'day' | 'month' | 'year';

// All individual inputs have a fixed suffix for date types
export function dateInputIds(type: TDateType) {
	switch (type) {
		case 'day': return 'dd';
		case 'month': return 'mm';
		case 'year': return 'yyyy';
	}
}

// Clicking on the label calls this function to "remember" the last focused input
export function focusLastInput(dom: Element, id: string, focusedId?: TDateInputType) {
	const lastFocused = dom.querySelector(`#${id}-${focusedId}`) as HTMLElement;
	lastFocused.focus();
}

// For showing custom validity message at the right place/input
function getInvalidInput(message: string): TDateInputType | null {
	const formattedMessage = message ? message.toLocaleLowerCase() : "";
	if (formattedMessage.includes('month')) {
		return 'mm';
	} else if (formattedMessage.includes('day')) {
		return "dd";
	} else if (formattedMessage.includes('year')) {
		return 'yy';
	} else {
		return null;
	}
}

function focusAndSelectNextInput(dom: Element, id: string, targetType: TDateInputType) {
	const nextInput = dom.querySelector(`#${id}-${targetType}`) as HTMLInputElement;
	nextInput.focus();
	nextInput.select();
}

function getElementMaxLength(element: HTMLInputElement) {
	return parseInt(element.getAttribute("maxlength") as string);
}

interface IAdvanceTarget {
	readonly next?: TDateInputType;
	readonly prev?: TDateInputType;
}
export function handleRetreatOrLiteralAdvance(
	id: string, selfType: TDateInputType, streamValue: string, dom: Element, event: KeyboardEvent, literalKey: string,
	{ next, prev }: IAdvanceTarget
) {
	const self = dom.querySelector(`#${id}-${selfType}`) as HTMLInputElement;
	const maxLength = getElementMaxLength(self);

	if ((event.key === 'Backspace' || event.key === 'Delete') && streamValue.length === 0 && prev) {
		focusAndSelectNextInput(dom, id, prev);
		// prevent event from passing to the previous field & deleting characters right away
		event.preventDefault();
	}
	else if (literalKey.charCodeAt(0) === event.key.charCodeAt(0)
		&& next && streamValue.length !== 0 && streamValue.length < maxLength) {
		focusAndSelectNextInput(dom, id, next);
		// prevent event from passing to the next field & advancing right away
		event.preventDefault();
	}
}


// for multi date binding purpose, to reset value stream when date stream is invalid
export function resetInvalidValueStream(valid: boolean, date: string,
	year: string, month: string, day: string, valueStream: TPropStream) {
	if (validDateInputLengths(year, month, day) && valid) {
		valueStream(date);
	} else {
		valueStream("");
	}
}

export function appendZeroToDayMonth(valueStream: TPropStream) {
	const value = String(valueStream());
	if (value.length === 1 && value !== '0') {
		valueStream(`0${value}`);
	}
}

export function validDateInputLengths(year: string, month: string, day: string) {
	// Expect 4 digit year for full date, 2 digit for "card date" (no day component)
	const yearLength = !day ? 2 : 4;
	return year.length === yearLength && month.length === 2 && (!day || day.length === 2);
}

// get input type for the message from Luxon error explanation
function getDateFromExplanation(errMsg: string) {
	if (errMsg.includes('month')) {
		return 'month';
	} else if (errMsg.includes('day')) {
		return 'day';
	}
	// edge case
	return "date";
}

function getDateValidityMessage(validation: DateTime, year: string, dateEmpty: boolean) {
	if (validation.invalidExplanation) {
		if (dateEmpty) {
			return "";
		} else {
			// Get the wrong input type from the luxon invalidation explanation
			return `Please check the ${getDateFromExplanation(validation.invalidExplanation)}.`;
		}
	} else if (!validation.year || Number(year) < 1900) {
		return "Year must be greater than 1900.";
	}
	// If valid
	return "";
}

function getCardDateValidityMessage(year: string, month: string, valid: boolean) {
	if (!valid) {
		if (!month && !year) {
			// Default broswer validation message
			return "";
		} else if (month.length !== 2 || Number(month) > 12) {
			return `Please check the month.`;
		} else if (year.length !== 2) {
			return `Please check the year.`;
		}
	}
	// unset validation message if valid
	return "";
}

// Loop through all 2-3 date inputs and only set custom validity for the wrong one
function setAllValidityMessage(message: string, dom?: Element) {
	if (dom) {
		const inputId = getInvalidInput(message);
		dom.querySelectorAll('input').forEach((item) => {
			if (inputId && item.id.substring(item.id.length - 2) === inputId && message) {
				item.setCustomValidity(message);
			} else {
				item.setCustomValidity("");
			}
		});
	}
}

export function validateCardDate(year: string, month: string, required: boolean, dom?: Element) {
	const valid = (
		month.length === 2 && year.length === 2
		&& Number(month) <= 12 && Number(month) > 0
	) || (!year && !month && !required);
	setAllValidityMessage(getCardDateValidityMessage(year, month, valid), dom);
	return valid;
}

export function validateDate(year: string, month: string, day: string, field: IField, dom?: Element) {
	const validation = DateTime.fromObject({
		year: Number(year),
		month: Number(month),
		day: Number(day)
	});
	const dateEmpty = !year && !month && !day;
	setAllValidityMessage(getDateValidityMessage(validation, year, dateEmpty), dom);
	const boundsValid = Number(year) >= 1900;
	const minValid = field.min ? validation >= DateTime.fromISO(String(field.min)) : true;
	const maxValid = field.max ? validation <= DateTime.fromISO(String(field.max)) : true;
	return (validation.isValid && minValid && maxValid && boundsValid) || (dateEmpty && !field.required);
}

export function handleDateChange(
	streamType: TPropStream, id: string, selfType: TDateInputType,
	dom: Element, targetType?: TDateInputType
) {

	const self = dom.querySelector(`#${id}-${selfType}`) as HTMLInputElement;
	const prevValue = streamType() || "";
	const value = self.value;
	const isNumeric = /^\d*$/.test(value);

	if ((isNumeric || value === "") && value.length <= 4) {
		streamType(value);
	} else {
		// preserve current/previous value when rules are broken
		streamType(prevValue);
	}
	if (String(streamType()).length === getElementMaxLength(self) && targetType) {
		focusAndSelectNextInput(dom, id, targetType);
	}
}
