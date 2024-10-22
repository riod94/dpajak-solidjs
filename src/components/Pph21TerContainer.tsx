import { createMemo, createSignal } from "solid-js";
import {
	INITIAL_STATE,
	LIST_OF_EFFECTIVE_RATES,
	TER_CATEGORY,
} from "~/config/constants";
import { Pph21TerStateInterface } from "~/config/interfaces";
import { Money, calculateSum } from "~/lib/utils";
import ButtonRadioGroup from "./reusable/button-radio-group";
import { Button } from "./ui/button";
import DefaultInput from "./reusable/default-input";

function Pph21TerContainer() {
	const [state, setState] = createSignal(INITIAL_STATE.PPH_21_TER_STATE);
	const personal = createMemo(() => state().personal);
	const earnings = createMemo(() => state().earnings);
	const result = createMemo(() => state().result);

	const handleStateChange = (
		groupKey: keyof Pph21TerStateInterface,
		key: number,
		value: any
	) => {
		setState((prev) => {
			const newState = { ...prev };
			newState[groupKey][key].value = value;
			return newState;
		});
	};

	const handleResetState = () => {
		const resetState = { ...INITIAL_STATE.PPH_21_TER_STATE };
		Object.keys(resetState).forEach((groupKey) => {
			resetState[groupKey as keyof Pph21TerStateInterface].forEach(
				(item, index) => {
					let value = "";
					if (item.type === "button-group") {
						switch (item.name) {
							case "npwp":
								value = "Ya";
								break;
							case "taxMethod":
								value = "GROSS";
								break;
							case "ptkpStatus":
								value = "TK/0";
								break;
							case "earningPeriod":
								value = "12";
								break;
						}
					}
					if (item.type === "money") {
						value = "0";
					}
					resetState[groupKey as keyof Pph21TerStateInterface][
						index
					].value = value;
				}
			);
		});
		setState(resetState);
	};

	const handleSubmit = () => {
		const earnings: any = state().earnings.filter(
			(item: any) => Money.toNumeric(item.value) > 0 && item.name != "gross"
		);
		const gross: number = calculateSum(earnings, "value");
		const terCategory: string =
			gross > 0
				? TER_CATEGORY.find(
						(item: any) =>
							item.ptkp ==
								state().personal.find(
									(item: any) => item.name == "ptkpStatus"
								)?.value || ""
				  )?.category ?? ""
				: "";

		const rates: any =
			LIST_OF_EFFECTIVE_RATES.find(
				(item: any) => item.category == terCategory
			)?.rates ?? [];

		const rate: { from: number; until: number; rate: number } = rates?.find(
			(item: { from: number; until: number; rate: number }) =>
				(gross > item.from && gross <= item.until) ||
				(item.until == 0 && gross > item.from)
		) ?? { from: 0, until: 0, rate: 0 };

		let pph21Monthly: number = Math.round(gross * rate.rate);
		const method = state().personal.find(
			(item) => item.name === "taxMethod"
		)?.value;

		pph21Monthly =
			method === "GROSS"
				? pph21Monthly
				: Math.round((gross + pph21Monthly) * rate.rate);

		const percent = (rate.rate * 100).toFixed(2);

		setState((prev) => {
			return {
				...prev,
				earnings: [
					...prev.earnings.map((item: any) => {
						if (item.name == "gross") {
							return {
								...item,
								value: Money.toString(gross),
							};
						}
						return item;
					}),
				],
				result: [
					...prev.result.map((item: any) => {
						if (item.name === "terCategory") {
							return { ...item, value: `TER ${terCategory}` };
						}
						if (item.name === "terStartRange") {
							return { ...item, value: Money.toString(rate.from ?? 0) };
						}
						if (item.name === "terEndRange") {
							return { ...item, value: Money.toString(rate.until ?? 0) };
						}
						if (item.name === "terRate") {
							return {
								...item,
								value: rate?.rate ? `${percent}%` : "0%",
							};
						}
						if (item.name === "pph21Monthly") {
							return { ...item, value: Money.toString(pph21Monthly) };
						}
						return item;
					}),
				],
			};
		});
	};

	return (
		<div class="container m-auto gap-6 grid grid-cols-1 lg:grid-cols-3">
			<div class="w-full">
				<h6 class="font-bold text-center my-2">Data Personal</h6>
				{personal().map((item: any, index: number) => (
					<div id={item.name}>
						<hr />
						<div class="m-2">
							{item.type == "text" ? (
								<DefaultInput
									{...item}
									value={state().personal[index].value}
									onChange={(value) =>
										handleStateChange("personal", index, value)
									}
								/>
							) : (
								<ButtonRadioGroup
									{...item}
									data={state().personal[index].items ?? []}
									value={state().personal[index].value}
									onChange={(value) =>
										handleStateChange("personal", index, value)
									}
								/>
							)}
						</div>
					</div>
				))}
			</div>
			<div class="w-full">
				<h6 class="font-bold text-center my-2">Penghasilan</h6>
				{earnings().map((item: any, index: number) => (
					<div>
						<hr />
						<DefaultInput
							{...item}
							labelPlacement="left"
							value={state().earnings[index].value}
							onChange={(value) =>
								handleStateChange("earnings", index, value)
							}
						/>
					</div>
				))}
				<hr class="my-3" />
				<div class="container m-auto flex justify-center gap-6 mb-1 mt-4">
					<Button
						variant="outline"
						class="rounded-full"
						onClick={handleResetState}
					>
						Reset
					</Button>
					<Button
						type="submit"
						class="rounded-full"
						onClick={handleSubmit}
					>
						Hitung
					</Button>
				</div>
			</div>
			<div class="w-full">
				<h6 class="font-bold text-center my-2">Hasil Perhitungan PPh 21</h6>
				{result().map((item: any, index: number) => (
					<div>
						<hr />
						<DefaultInput
							{...item}
							labelPlacement="left"
							value={state().result[index].value}
							onChange={(value) =>
								handleStateChange("result", index, value)
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Pph21TerContainer;
