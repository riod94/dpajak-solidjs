import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Router } from "@solidjs/router";
import {
	ColorModeProvider,
	ColorModeScript,
	cookieStorageManagerSSR,
} from "@kobalte/core";
import { getCookie } from "vinxi/http";
import Nav from "~/components/Nav";

import "@fontsource/inter";
import "./app.css";
import Footer from "./components/footer";
import { Meta, MetaProvider } from "@solidjs/meta";
import SiteTitle from "./components/SiteTitle";

function getServerCookies() {
	"use server";
	const colorMode = getCookie("kb-color-mode");
	return colorMode ? `kb-color-mode=${colorMode}` : "";
}

export default function App() {
	const storageManager = cookieStorageManagerSSR(
		isServer ? getServerCookies() : document.cookie
	);

	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<SiteTitle />
					<Meta
						name="description"
						content="DPAJAK adalah aplikasi kalkulator pajak online. Hitung pajak penghasilan pasal 21 dan pajak pertambahan nilai dengan mudah."
					/>
					<Meta
						name="keywords"
						content="dpajak, kalkulator, pajak, kalkulator pajak, kalkulator-pajak, kalkulator pph, pph, ppn, pph21, pph 21, pasal, pph pasal 21, about, tarif efektif, tarif efektif rata-rata, TER, ter, masa pajak, masa pajak terakhir, terbaru, 2024, tarif, bonus, THR, pegawai tetap, ppn, pajak pertambahan nilai, dpp, bruto, kategori, simulasi, perhitungan, gaji,tunjangan, pengurang, tarif pajak, 2024"
					/>
					<Meta name="theme-color" content="#2aa382" />
					<Meta property="og:image:alt" content="Welcome to Dpajak" />
					<Meta property="og:image:width" content="1200" />
					<Meta property="og:image:height" content="600" />
					<Meta property="og:site_name" content="GitHub" />

					<ColorModeScript storageType={storageManager.type} />
					<ColorModeProvider storageManager={storageManager}>
						<Nav />
						<main class="relative flex flex-col h-full">
							<Suspense>{props.children}</Suspense>
						</main>
						<Footer />
					</ColorModeProvider>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
