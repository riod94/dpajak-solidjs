import { createEffect, createSignal, Show } from "solid-js";
import Money from "~/lib/money";
import {
	TextField,
	TextFieldErrorMessage,
	TextFieldInput,
	TextFieldLabel,
} from "../ui/text-field";
import { Label } from "../ui/label";

interface DefaultInputProps {
	isReadOnly?: boolean;
	isRequired?: boolean;
	isDisabled?: boolean;
	errorMessage?: string;
	type?:
		| "text"
		| "number"
		| "money"
		| "email"
		| "password"
		| "url"
		| "date"
		| "time"
		| "tel";
	name?: string;
	label?: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	classes?: {
		input?: string;
		label?: string;
		mainWrapper?: string;
	};
	labelPlacement?: "left" | "top";
}

export default function DefaultInput({
	isReadOnly = false,
	isRequired = false,
	isDisabled = false,
	type = "text",
	errorMessage,
	name,
	label,
	placeholder,
	value,
	defaultValue,
	onChange,
	classes,
	labelPlacement = "left",
}: Readonly<DefaultInputProps>) {
	const inputType = type === "money" ? "text" : type;
	const [state, setState] = createSignal(value ?? defaultValue ?? "");
	const defaultClasses = {
		input: `rounded-full m-1 ${
			isReadOnly ? "bg-zinc-200 dark:bg-zinc-800" : ""
		} ${isDisabled ? "bg-neutral-400 dark:bg-neutral-800" : ""} `,
		mainWrapper: `p-1 ${
			labelPlacement == "left"
				? "flex flex-row justify-center items-center"
				: ""
		} `,
		label: `m-1 content-center `,
	};

	// efek untuk memperbarui state saat nilai properti value berubah
	createEffect(() => {
		setState(value ?? defaultValue ?? "");
	}, [value, defaultValue]);

	const handleOnChange = (value: string) => {
		let formattedValue = value;

		if (type === "money") {
			const numericValue = Money.toNumeric(value);

			if (!isNaN(numericValue)) {
				formattedValue = Money.toString(numericValue);
			} else if (value === "") {
				formattedValue = type === "money" ? "0" : ""; // Mengosongkan nilai jika input kosong
			} else {
				formattedValue = state(); // Mengembalikan nilai sebelumnya jika input tidak valid
			}
		}
		console.log(formattedValue);
		setState(formattedValue);
		onChange && onChange(formattedValue);
	};

	const handleFocusAndBlur = (action: string) => {
		if (action === "focus") {
			!isReadOnly && state() == "0" && setState("");
		}
		if (action === "blur") {
			!isReadOnly && state() == "" && type === "money" && setState("0");
		}
	};

	return (
		<TextField
			readOnly={isReadOnly}
			required={isRequired}
			disabled={isDisabled}
			name={name}
			value={state()}
			defaultValue={defaultValue}
			onChange={handleOnChange}
			onFocus={() => handleFocusAndBlur("focus")}
			onBlur={() => handleFocusAndBlur("blur")}
			class={defaultClasses.mainWrapper + classes?.mainWrapper}
		>
			<TextFieldLabel class={defaultClasses.label + classes?.label}>
				{label}
			</TextFieldLabel>
			<TextFieldInput
				type={inputType}
				placeholder={placeholder}
				class={defaultClasses.input + classes?.input}
			/>
			<Show when={errorMessage}>
				<TextFieldErrorMessage>{errorMessage}</TextFieldErrorMessage>
				<Label class="text-destructive mx-2 text-xs">{errorMessage}</Label>
			</Show>
		</TextField>
	);
}
