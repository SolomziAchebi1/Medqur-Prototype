import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAppStore, o as medications, s as patients } from "./router-r1p9Zho0.mjs";
import { t as Button } from "./button-CgvJkGh_.mjs";
import { t as AppShell } from "./app-shell-C2QdxYDD.mjs";
import { t as Input } from "./input-BWojBZUQ.mjs";
import { t as Label } from "./label-CBHCdkyL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-Bo-bCpcC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrdersPage() {
	const addOrder = useAppStore((s) => s.addOrder);
	const navigate = useNavigate();
	const [patientId, setPatientId] = (0, import_react.useState)(patients[0]?.id ?? "");
	const [medicationId, setMedicationId] = (0, import_react.useState)(medications[0]?.id ?? "");
	const [dose, setDose] = (0, import_react.useState)("5 mg");
	const [route, setRoute] = (0, import_react.useState)("PO");
	const [frequency, setFrequency] = (0, import_react.useState)("once daily");
	const med = medications.find((m) => m.id === medicationId);
	function submit(e) {
		e.preventDefault();
		if (!med) return;
		const order = {
			id: `o-new-${Date.now()}`,
			patientId,
			medicationId: med.id,
			generic: med.generic,
			displayName: med.brand,
			dose,
			doseMg: med.strengthMg,
			route,
			frequency,
			dueAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "due",
			prescribedBy: "Dr A. Grant"
		};
		addOrder(order);
		navigate({
			to: "/patient/$id",
			params: { id: patientId }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-widest text-muted uppercase",
			children: "Prescriber"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: "Write an order"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Add a chart line, then open the patient and scan. Use this to stage a mismatch for a sales walkthrough."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-6 max-w-lg space-y-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "patient",
						children: "Patient"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "patient",
						value: patientId,
						onChange: (e) => setPatientId(e.target.value),
						className: "flex h-11 w-full rounded-md border border-border-strong bg-surface px-3 text-sm",
						children: patients.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [
								p.bed,
								" · ",
								p.name
							]
						}, p.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "med",
						children: "Medicine"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "med",
						value: medicationId,
						onChange: (e) => {
							const next = medications.find((m) => m.id === e.target.value);
							setMedicationId(e.target.value);
							if (next) {
								setDose(next.strength);
								setRoute(next.route);
							}
						},
						className: "flex h-11 w-full rounded-md border border-border-strong bg-surface px-3 text-sm",
						children: medications.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: m.id,
							children: [
								m.brand,
								" ",
								m.strength,
								" (",
								m.form,
								")"
							]
						}, m.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "dose",
							children: "Dose"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "dose",
							value: dose,
							onChange: (e) => setDose(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "route",
							children: "Route"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "route",
							value: route,
							onChange: (e) => setRoute(e.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "freq",
						children: "Frequency"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "freq",
						value: frequency,
						onChange: (e) => setFrequency(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					className: "w-full",
					children: "Sign order"
				})
			]
		})
	] });
}
//#endregion
export { OrdersPage as component };
