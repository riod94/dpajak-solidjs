import Pph21TerContainer from "~/components/Pph21TerContainer";
import SiteTitle from "~/components/SiteTitle";
import { subtitle, title } from "~/config/primitives";

export default function Home() {
	return (
		<>
			<SiteTitle>Kalkulator PPh21 TER</SiteTitle>
			<section class="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div class="inline-block max-w-xl text-center justify-center">
					<h1 class={title()}>Kalkulator&nbsp;</h1>
					<h1 class={title({ color: "green" })}>PPh 21&nbsp; Masa</h1>
					<br />
					<h2 class={subtitle({ class: "mt-2" })}>
						Simulasi perhitungan PPh Pasal 21 Masa Pajak (Jan-Nov)
					</h2>
				</div>

				<Pph21TerContainer />

				<div class="container m-auto flex flex-col justify-center gap-6 my-4">
					<p class="font-bold">Disclaimer</p>
					<p>
						Sesuai dengan Peraturan Pemerintah Nomor 58 Tahun 2023 dan
						Peraturan Menteri Keuangan Nomor 168 Tahun 2023, mulai 1
						Januari 2024 berlaku tarif Pajak Efektif Rata-rata(TER)
					</p>
				</div>
			</section>
		</>
	);
}
