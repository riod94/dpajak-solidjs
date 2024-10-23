import SiteTitle from "~/components/SiteTitle";
import { title } from "~/config/primitives";

export default function About() {
	return (
		<>
			<SiteTitle>About</SiteTitle>
			<main class="text-center mt-24 mx-auto text-gray-700 p-4">
				<h1 class={title({ color: "green" })}>About</h1>
				<p class="max-w-xl mt-8">
					DPAJAK merupakan web kalkulator perhitungan pajak yang sederhana
					dan mudah digunakan. Dengan antarmuka yang intuitif, Anda dapat
					menghitung Pajak Penghasilan Pasal 21 (PPh21) dan Pajak
					Pertambahan Nilai (PPN) dengan cepat dan mudah.
				</p>
				<p class="max-w-xl my-4">
					Jangan biarkan perhitungan PPh21 menjadi beban tambahan bagi
					Anda. Dengan DPAJAK, Anda dapat membuat simulasi perhitungan
					pajak dengan efisien, akurat dan selalu terbaru sesuai dengan
					undang-undang yang berlaku. Untuk kedepannya DPAJAK akan terus
					melakukan update perhitungan pajak lainnya!
				</p>
			</main>
		</>
	);
}
