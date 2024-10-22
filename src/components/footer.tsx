import { Button } from "./ui/button";

export default function Footer() {
	const startYear = 2024;
	const currentYear = new Date().getFullYear();

	const year =
		currentYear > startYear ? `${startYear}-${currentYear}` : startYear;
	return (
		<footer class="w-full flex items-center justify-center py-3">
			<Button
				variant="ghost"
				as="a"
				class="flex items-center gap-1 text-current p-0 hover:bg-transparent"
				href={"/"}
			>
				<span class="text-default-600">&copy; {year}</span>
				<p class="text-primary">DPAJAK</p>
			</Button>
		</footer>
	);
}
