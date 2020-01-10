export * from "./interface/widget";

export { updateConfig } from "./config";
export { updateTheme, getIcon } from "./theme";
export { fileNameExtSplit, guid } from "./utils";

export { Badge } from "./badge";
export { Button } from "./button";

// Display widgets
// Prop
export { Trusted } from "./display/trusted";
export { BaseText } from "./display/baseText";
export { iconMap, linkAttrs, Link } from "./display/link";
export { Checkbox } from "./display/checkbox";
// Prop (options)
export { SelectText } from "./display/select";
// File
export { FileList } from "./display/file";
export { ImageList } from "./display/image";
export { ImagePreview } from "./display/imagePreview";

// Input widgets
export { Label } from "./input/label";
// Prop
export { BaseInput } from "./input/baseInput";
export { PasswordInput } from "./input/password";
export { TextareaInput } from "./input/textarea";
export { CheckboxInput } from "./input/checkbox";
// Prop (options)
export { RadioInput } from "./input/radio";
export { SelectInput } from "./input/select";
// File
export { FileMulti } from "./input/fileMulti";
export { FileSelect } from "./input/fileSelect";
export { ImageMulti } from "./input/imageMulti";
export { ImageSelect } from "./input/imageSelect";
export { SignBuilder } from "./input/sign";
