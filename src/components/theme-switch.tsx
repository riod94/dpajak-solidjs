import { useColorMode } from "@kobalte/core";
import { TbSun, TbMoon } from "solid-icons/tb";
import { Toggle } from "./ui/toggle";
import { Show } from "solid-js";

export function ModeToggle() {
	const { colorMode, setColorMode } = useColorMode();

	return (
		<Toggle
			on:click={() =>
				setColorMode(colorMode() === "dark" ? "light" : "dark")
			}
			class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none px-4 py-5 mx-2"
		>
			<Show when={colorMode() === "dark"} fallback={<TbMoon size={20} />}>
				<TbSun size={20} />
			</Show>
		</Toggle>
	);
}
