import { Title } from "@solidjs/meta";
import { ComponentProps } from "solid-js";

export default function SiteTitle(props: {
	children?: ComponentProps<"title">["children"];
}) {
	return (
		<Title>{props.children ? props.children + " | DPAJAK" : "DPAJAK"} </Title>
	);
}
