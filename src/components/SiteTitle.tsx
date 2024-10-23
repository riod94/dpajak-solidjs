import { Title } from "@solidjs/meta";
import { ComponentProps } from "solid-js";

export default function SiteTitle(
	props: Readonly<{
		children?: ComponentProps<"title">["children"];
	}>
) {
	return (
		<Title>{props.children ? String(props.children) + " | DPAJAK" : "DPAJAK"} </Title>
	);
}
