import { Button } from "~/components/ui/button";

export default function NotFound() {
	return (
		<main class="flex justify-center items-center h-fit text-center mx-auto text-gray-700 p-4">
			<div class="max-w-md">
				<h1 class="text-9xl font-thin uppercase my-16">404</h1>
				<h2 class="text-4xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
				<p class="mb-8">
					Maaf, halaman yang Anda cari tidak ditemukan. Silakan kembali ke
					halaman utama atau coba lagi.
				</p>
				<div class="flex justify-center mb-8">
					<Button as="a" href="/">
						Kembali ke Beranda
					</Button>
				</div>
			</div>
		</main>
	);
}
