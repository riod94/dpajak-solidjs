import { createMemo, createSignal } from "solid-js";
import ButtonRadioGroup from "~/components/reusable/button-radio-group";
import { DefaultAccordion } from "~/components/reusable/default-accordion";
import DefaultInput from "~/components/reusable/default-input";
import { Button } from "~/components/ui/button";
import { FAQ, INITIAL_STATE } from "~/config/constants";
import { PpnStateInterface } from "~/config/interfaces";
import { subtitle, title } from "~/config/primitives";
import Money from "~/lib/money";

export default function PpnPage() {
	const [state, setState] = createSignal(INITIAL_STATE.PPN_STATE);

	const settings = createMemo(() => state().settings);
	const components = createMemo(() => state().components);
	const result = createMemo(() => state().result);

	const handleStateChange = (
		groupKey: keyof typeof INITIAL_STATE.PPN_STATE,
		key: number,
		value: string | number
	) => {
		setState((prev) => {
			const newState = { ...prev };
			newState[groupKey][key].value = String(value);
			return newState;
		});
	};

	const handleResetState = () => {
		const resetState = { ...INITIAL_STATE.PPN_STATE };
		Object.keys(resetState).forEach((groupKey) => {
			resetState[groupKey as keyof PpnStateInterface].forEach(
				(item, index) => {
					const value =
						item.name == "type"
							? "Tidak"
							: item.type === "money"
							? "0"
							: "";
					resetState[groupKey as keyof PpnStateInterface][index].value =
						value;
				}
			);
		});
		setState(resetState);
	};

	const handleSubmit = () => {
		// Mengambil nilai price, quantity, dan discount dari state dan ubah menjadi number
		const price: number = Money.toNumeric(
			state().components.find((item: any) => item.name == "price")?.value
		);
		const quantity: number = Money.toNumeric(
			state().components.find((item: any) => item.name == "quantity")?.value
		);
		const discount: number = Money.toNumeric(
			state().components.find((item: any) => item.name == "discount")?.value
		);

		const tax: number = 0.11; // Persentase pajak

		let dpp: number = price * quantity - discount; // Menghitung nilai DPP

		const type: string =
			state().settings.find((item: any) => item.name == "type")?.value ||
			"Tidak"; // Mendapatkan nilai tipe ("Ya" atau "Tidak")

		let ppn: number = dpp * tax; // Menghitung nilai PPN

		if (type == "Ya") {
			// Jika tipe adalah "Ya", maka menghitung nilai DPP sebelum pajak
			dpp = dpp / (1 + tax); // Menghitung nilai DPP sebelum pajak
			ppn = dpp * tax; // Menghitung nilai PPN berdasarkan DPP
		}

		const total: number = dpp + ppn; // Menghitung total (DPP + PPN)

		setState((prev) => {
			return {
				...prev,
				result: [
					...prev.result.map((item: any) => {
						if (item.name === "dpp") {
							return { ...item, value: Money.toString(Math.round(dpp)) };
						}
						if (item.name === "ppn") {
							return { ...item, value: Money.toString(Math.round(ppn)) };
						}
						if (item.name === "total") {
							return {
								...item,
								value: Money.toString(Math.round(total)),
							};
						}
						return item;
					}),
				],
			};
		});
	};

	return (
		<div>
			<div class="text-center justify-center">
				<h1 class={title()}>Kalkulator&nbsp;</h1>
				<h1 class={title({ color: "green" })}>PPN&nbsp;</h1>
				<br />
				<h2 class={subtitle({ class: "my-4" })}>
					Simulasi perhitungan Pajak Pertambahan Nilai dari Barang/Jasa
				</h2>
			</div>

			<div class="container m-auto gap-6 grid grid-cols-1 lg:grid-cols-5 my-8">
				{settings().map((item: any, index: number) =>
					item.type == "text" ? (
						<div class="w-full col-span-2">
							<DefaultInput
								{...item}
								value={state().settings[index].value}
								onChange={(value) =>
									handleStateChange("settings", index, value)
								}
							/>
						</div>
					) : (
						<div class="w-full col-span-3">
							<ButtonRadioGroup
								{...item}
								data={item.items}
								value={state().settings[index].value}
								onChange={(value) =>
									handleStateChange("settings", index, value)
								}
							/>
						</div>
					)
				)}
			</div>
			<div class="container m-auto gap-2 grid grid-cols-1 lg:grid-cols-6 my-8">
				{components().map((item: any, index: number) => (
					<div class="w-full col-span-2">
						<DefaultInput
							{...item}
							value={state().components[index].value}
							onChange={(value) =>
								handleStateChange("components", index, value)
							}
						/>
					</div>
				))}
			</div>
			<div class="container m-auto gap-2 grid grid-cols-1 lg:grid-cols-6 my-8">
				{result().map((item: any, index: number) => (
					<div class="w-full col-span-2">
						<DefaultInput
							{...item}
							value={state().result[index].value}
							onChange={(value) =>
								handleStateChange("result", index, value)
							}
						/>
					</div>
				))}
			</div>
			<div class="container m-auto flex justify-center gap-6 my-4">
				<Button
					variant="outline"
					class="rounded-full"
					onClick={handleResetState}
				>
					Reset
				</Button>
				<Button
					type="submit"
					color="success"
					class="rounded-full"
					onClick={handleSubmit}
				>
					Hitung
				</Button>
			</div>

			<div class="container m-auto flex flex-col justify-center gap-2 my-4">
				<p class="font-bold">Disclaimer</p>
				<p>
					Kalkulator Pajak Pertambahan Nilai (PPN) disusun sesuai dengan
					ketentuan yang berlaku per tanggal 1 April 2022. Berdasarkan
					regulasi terbaru, tarif PPN ditetapkan sebesar 11% atau meningkat
					dibandingkan tarif sebelumnya yang sebesar 10%.
				</p>
			</div>
			<div class="container m-auto flex flex-col justify-center gap-2 mb-4 mt-12">
				<p class="font-bold">FAQ</p>
				<DefaultAccordion items={FAQ.PPN} />
			</div>
		</div>
	);
}
