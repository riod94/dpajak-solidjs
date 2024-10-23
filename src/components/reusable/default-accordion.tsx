import { For } from "solid-js";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

interface AccordionPropsInterface {
	multiple?: boolean;
	items: AccordionItemInterface[];
}

interface AccordionItemInterface {
	key: string;
	title: string;
	content: any;
}

export function DefaultAccordion({
	multiple = false,
	items,
}: Readonly<AccordionPropsInterface>) {
	return (
		<Accordion multiple={multiple} collapsible class="w-full">
			<For each={items}>
				{(item) => (
					<AccordionItem value={item.key} class="shadow-lg border-gray-200 border-2 px-4 my-4 rounded-2xl">
						<AccordionTrigger>{item.title}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				)}
			</For>
		</Accordion>
	);
}
