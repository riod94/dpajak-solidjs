import { createSignal, For } from "solid-js";
import { Flex } from "../ui/flex";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";

interface ButtonRadioGroupProps {
	label: string;
	value: string | number;
	data: {
		label: string;
		value: string | number;
	}[];
	onChange?(value: string | number): void;
}

export default function ButtonRadioGroup({
	label = "",
	value = "",
	data = [],
	onChange = () => {},
}: Readonly<ButtonRadioGroupProps>) {
	const [active, setActive] = createSignal(value);

	const handleValueChange = (newValue: string | number) => {
		setActive(newValue);
		onChange(newValue);
	};

	return (
		<Flex flexDirection="col" justifyContent="start" alignItems="start" class="my-2">
			<Label class="m-1">{label}</Label>
			<Flex justifyContent="start" alignItems="center" class="flex-wrap">
				<For each={data}>
					{(item) => (
						<Button
							variant="outline"
							size="sm"
							class={`border-primary border-2 rounded-full m-1 ${
								active() === item.value
									? "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
									: ""
							}`}
							onClick={() => handleValueChange(item.value)}
						>
							{item.label}
						</Button>
					)}
				</For>
			</Flex>
		</Flex>
	);
}
