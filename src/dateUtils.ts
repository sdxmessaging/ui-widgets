import { TPropStream } from "./interface/widget";

import stream from "mithril/stream";
import { DateTime } from "luxon";


export type TDateInputType = "dd" | "mm" | "yyyy" | "yy";
export type TDateType = 'day' | 'month' | 'year';

export function dateInputIds(type: TDateType) {
	switch (type) {
		case 'day': return 'dd';
		case 'month': return 'mm';
		case 'year': return 'yyyy';
	}
}
export function focusLastInput(dom: Element, id: string, focusedId: TDateInputType | undefined) {
	const lastFocused = dom.querySelector(`#${id}-${focusedId}`) as HTMLElement;
	lastFocused.focus();
}

// export function dateInRange(type: TDateInputType, first: number, second: number) {
// 	switch (type) {
// 		case "dd":
// 			return (isNaN(first) || first <= 3) && ((isNaN(second) || ((first === 3 && second <= 1))
// 				|| first < 3) && !(first === 0 && second === 0));
// 		// month from 01 to 12
// 		case "mm":
// 			return (isNaN(first) || first <= 1) && ((isNaN(second) || ((first === 1 && second <= 2))
// 				|| first < 1) && !(first === 0 && second === 0));
// 		// year has to start from 1 or above & min 1900
// 		case "yyyy":
// 			return (isNaN(first) || (first >= 1 && first < 3)) &&
// 				(isNaN(second) || ((first === 1 && second === 9)) || (first === 2));
// 		case "yy":
// 			return isNaN(first) || first >= 0;
// 	}
// }

function getInvalidInput(message: string): TDateInputType | undefined {
	const formattedMessage = message ? message.toLocaleLowerCase() : "";
	if (formattedMessage.includes('month')) return 'mm';
	else if (formattedMessage.includes('day')) return "dd";
	else if (formattedMessage.includes('year')) return 'yy';
	return undefined;
}

export function updateDom(newDom: Element, currentDom: stream<Element>) {
	if (newDom !== currentDom()) {
		currentDom(newDom);
	}
}

function focusAndSelectNextInput(dom: Element, id: string, targetType: TDateInputType) {
	const nextInput = dom.querySelector(`#${id}-${targetType}`) as HTMLInputElement;
	nextInput.focus();
	nextInput.select();
}

function getSelfMaxLength(self: HTMLInputElement) {
	return parseInt(self.getAttribute("maxlength") as string);
}

export function handleRetreatOrLiteralAdvance(
	id: string, selfType: TDateInputType, streamValue: string, dom: Element, event: KeyboardEvent, literalKey: string,
	nextTargetType: TDateInputType | undefined, prevTargetTyype: TDateInputType | undefined
) {
	const self = dom.querySelector(`#${id}-${selfType}`) as HTMLInputElement;
	const maxLength = getSelfMaxLength(self);

	if ((event.key === 'Backspace' || event.key === 'Delete') && streamValue.length === 0 && prevTargetTyype) {
		focusAndSelectNextInput(dom, id, prevTargetTyype);
		// prevent event from passing to the previous field & deleting characters right away
		event.preventDefault();
	}
	else if (literalKey.charCodeAt(0) === event.key.charCodeAt(0)
		&& nextTargetType && streamValue.length !== 0 && streamValue.length < maxLength) {
		focusAndSelectNextInput(dom, id, nextTargetType);
		// prevent event from passing to the next field & advancing right away
		event.preventDefault();
	}
}

export function resetInvalidValueStream(valid: boolean, date: string,
	year: string, month: string, day: string, valueStream: TPropStream) {
	if (validDateInputLengths(year, month, day) && valid) {
		valueStream(date);
	}
	else {
		valueStream("");
	}
}

export function appendZeroToDayMonth(valueStream: TPropStream) {
	const value = valueStream() as string;
	if (value.length === 1 && value !== '0') valueStream(`0${value}`);
}

export function validDateInputLengths(year: string, month: string, day: string) {
	const isCardDateInput = !day;
	const yearLength = isCardDateInput ? 2 : 4;
	return year.length === yearLength && month.length === 2 && (!day || day.length === 2);
}

function getDateValidityMessage(validation: DateTime, year: string, dateEmpty: boolean) {
	function getInputType(message: string) {
		if (message.includes('month')) {
			return 'month';
		} else if (message.includes('day')) {
			return 'day';
		}
		// edge case
		return "date";
	}
	if (validation.invalidExplanation) {
		if (dateEmpty) {
			return "";
		}
		else {
			// Get the wrong input type from the luxon invalidation explanation
			const inputType = getInputType(validation.invalidExplanation);
			return `Please check the ${inputType}.`;
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
		}
		else if (month.length !== 2 || Number(month) > 12) {
			return `Please check the month.`;
		}
		else if (year.length !== 2) {
			return `Please check the year.`;
		}
	}
	// unset validation message if valid
	return "";
}

function setAllValidityMessage(dom: Element | undefined, message: string) {
	if (dom) {
		const inputId = getInvalidInput(message);
		const inputs = dom.querySelectorAll('input');
		inputs.forEach((item => {
			if (inputId && item.id.substr(-2) === inputId && message) {
				item.setCustomValidity(message);
			} else {
				item.setCustomValidity("");
			}
		}));
	}
}

export function validateCardDate(year: string, month: string, required: boolean, dom: Element | undefined) {
	// TODO validate year in the future if it is a valid_to input
	const dateEmpty = !year && !month;
	const valid = (month.length === 2 && Number(month) <= 12 && Number(month) > 0 && year.length === 2)
		|| (dateEmpty && !required);
	const message = getCardDateValidityMessage(year, month, valid);

	setAllValidityMessage(dom, message);

	return valid;
}

export function validateDate(year: string, month: string, day: string, required: boolean, dom: Element | undefined) {
	const validation = DateTime.fromObject({
		year: Number(year),
		month: Number(month),
		day: Number(day)
	});

	const dateEmpty = !year && !month && !day;
	const message = getDateValidityMessage(validation, year, dateEmpty);
	setAllValidityMessage(dom, message);

	return (validation.isValid && Number(year) >= 1900) || (dateEmpty && !required);
}

export function handleDateChange(streamType: TPropStream, id: string, selfType: TDateInputType,
	dom: Element, targetType?: TDateInputType) {

	const self = dom.querySelector(`#${id}-${selfType}`) as HTMLInputElement;
	const prevValue = streamType() ? streamType() : "";
	const value = self.value;
	const isNumeric = /^\d*$/.test(value);

	if ((isNumeric || value === "") && value.length <= 4) {
		streamType(value);
	}
	// preserve current/previous value when rules are broken
	else {
		streamType(prevValue);
	}

	const maxLength = getSelfMaxLength(self);
	if (value.length === maxLength && targetType) {
		focusAndSelectNextInput(dom, id, targetType);
	}
}
