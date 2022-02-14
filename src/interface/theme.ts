
export type TStyle = Partial<CSSStyleDeclaration> | Record<string, string>;

export interface IClasses {
	/** Widget outermost element */
	readonly wrapper?: string;
	/** Label */
	readonly label?: string;
	/** Input element container (including "decorations" in more advanced widgets) */
	readonly inputWrapper?: string;
	/** Input element if visible */
	readonly input?: string;
}

export interface IWidgetClasses extends IClasses {
	/** Combine classes with default classes in ui-widgets theme (true by default) */
	readonly merge?: boolean;
}

// ui-widgets global theme
export interface IClassMap extends IClasses {
	/** Classes common to all buttons */
	readonly button?: string;
	/** Classes common to all nav buttons */
	readonly navButton?: string;
	/** Classes for textarea */
	readonly textarea?: string;
	/** Classes for radio "buttons" */
	readonly radio?: string;
	/** Classes for selected radio option */
	readonly radioChecked?: string;
	/** Classes for deselected radio option */
	readonly radioUnchecked?: string;
	/** Classes for file "drop zone" */
	readonly fileInputWrapper?: string;
	/** Classes for file "drop zone" when dragging a file over it */
	readonly fileHover?: string;
	/** Classes for display widget label */
	readonly displayLabel?: string;
	/** Classes for display widget value */
	readonly displayValue?: string;
	/** Classes applied to required widget label */
	readonly requiredLabel?: string;
	/** Classes applied to disabled widget wrapper */
	readonly disabledWrapper?: string;
	/** Classes applied to widget wrapper when validation fails */
	readonly invalidInputWrapper?: string;
	/** Classes for alt label text */
	readonly altLabel?: string;
	/** Float Label Placeholder if it is not floating yet */
	readonly floatLabelPlaceholder?: string;
}
