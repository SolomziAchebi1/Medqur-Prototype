import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as medications } from "./router-r1p9Zho0.mjs";
import { t as AppShell } from "./app-shell-C2QdxYDD.mjs";
import { t as MedPack } from "./med-pack-Dc1qgW-U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/formulary-CYdYb_Y-.js
var import_jsx_runtime = require_jsx_runtime();
function FormularyPage() {
	const lookalikes = medications.filter((m) => m.lookAlikeOf);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-widest text-muted uppercase",
			children: "Kingston General Pharmacy"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: "Formulary"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: "Every pack on the trolley carries a DoseLock barcode. Look-alike pairs are stocked together on purpose in this demo — that is how they sit on a real ward."
		}),
		lookalikes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-xl bg-danger-soft p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-danger",
				children: "High-alert look-alikes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid gap-1 text-sm text-fg sm:grid-cols-2",
				children: lookalikes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					m.brand,
					" ",
					m.strength,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-muted",
						children: ["#", m.barcode]
					})
				] }, m.id))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: medications.map((med) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedPack, { med }, med.id))
		})
	] });
}
//#endregion
export { FormularyPage as component };
