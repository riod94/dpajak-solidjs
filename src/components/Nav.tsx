import { useLocation } from "@solidjs/router";
import { TbBrandGithub, TbHeartFilled } from "solid-icons/tb";
import { ModeToggle } from "./theme-switch";
import { Flex } from "./ui/flex";
import { Button } from "./ui/button";

const Logo = ({
	size = 36,
	width,
	height,
	...props
}: {
	size?: number;
	width?: number;
	height?: number;
	[key: string]: any;
}) => (
	<svg
		fill="none"
		height={size || height}
		viewBox="0 0 32 32"
		width={size || width}
		{...props}
	>
		<path
			clip-rule="evenodd"
			d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
			fill="currentColor"
			fill-rule="evenodd"
		/>
	</svg>
);

export default function Nav() {
	const location = useLocation();
	const active = (path: string) =>
		path == location.pathname
			? "text-primary hover:text-primary focus:text-primary"
			: "hover:text-primary focus:text-primary";

	return (
		<header class="z-50 sticky top-0 px-16 py-2 bg-transparent backdrop-blur-md bg-opacity-50">
			<Flex class="z-50 w-full justify-between">
				<Flex justifyContent="start">
					<Button
						variant="ghost"
						as="a"
						href="/"
						class={`items-center gap-1 text-current hover:bg-transparent p-0 mx-4 ${active(
							"/"
						)}`}
					>
						<Logo class="text-blue-800" />
						<p class="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-green-500">
							DPAJAK
						</p>
					</Button>
					<Button
						variant="ghost"
						as="a"
						href="/"
						class={`items-center gap-1 text-current hover:bg-transparent p-0 mx-4 ${active(
							"/"
						)}`}
					>
						Pph 21
					</Button>
					<Button
						variant="ghost"
						as="a"
						href="/ppn"
						class={`items-center gap-1 text-current hover:bg-transparent p-0 mx-4 ${active(
							"/ppn"
						)}`}
					>
						PPN
					</Button>
					<Button
						variant="ghost"
						as="a"
						href="/about"
						class={`items-center gap-1 text-current hover:bg-transparent p-0 mx-4 ${active(
							"/about"
						)}`}
					>
						About
					</Button>
				</Flex>
				<Flex justifyContent="end">
					<Button
						as="a"
						href="https://github.com/riod94"
						target="_blank"
						variant="ghost"
					>
						<TbBrandGithub size={20} />
					</Button>
					<ModeToggle />
					<Button
						as="a"
						href="https://nusawork.com"
						target="_blank"
						variant="secondary"
						class="rounded-lg"
					>
						<TbHeartFilled size={20} color="red" />
						&nbsp; Sponsor
					</Button>
				</Flex>
			</Flex>
		</header>
	);
}
