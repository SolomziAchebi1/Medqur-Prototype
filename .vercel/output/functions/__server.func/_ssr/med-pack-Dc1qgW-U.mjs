import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn } from "./button-CgvJkGh_.mjs";
import { t as Barcode } from "./barcode-0iwsbT-7.mjs";
import { t as Badge } from "./badge-DBKU_a7_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/med-pack-Dc1qgW-U.js
var import_jsx_runtime = require_jsx_runtime();
function MedPack({ med, onScan, highlight }) {
	const clickable = Boolean(onScan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(clickable ? "button" : "div", {
		type: clickable ? "button" : void 0,
		onClick: clickable ? () => onScan?.(med.barcode) : void 0,
		className: cn("flex w-full flex-col rounded-xl bg-surface p-3 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150", clickable && "hover:bg-bg-warm active:scale-[0.98]", highlight && "ring-2 ring-primary"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-widest text-muted uppercase",
						children: "KGH Pharmacy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-semibold leading-snug text-fg",
						children: med.brand
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm tabular-nums text-ink",
						children: med.strength
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-end gap-1",
					children: [med.controlled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "cd",
						children: "CD"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "default",
						children: med.form
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					med.generic,
					" · ",
					med.route
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 rounded-md bg-paper px-2 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barcode, {
					value: med.barcode,
					height: 36
				})
			}),
			clickable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-xs font-medium text-primary",
				children: "Tap pack to scan"
			}) : null
		]
	});
}
//#endregion
export { MedPack as t };
