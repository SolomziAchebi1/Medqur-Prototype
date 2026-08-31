import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAppStore, s as patients } from "./router-r1p9Zho0.mjs";
import { a as jamaicaNow } from "./button-CgvJkGh_.mjs";
import { t as AppShell } from "./app-shell-C2QdxYDD.mjs";
import { t as Badge } from "./badge-DBKU_a7_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/incidents-DnpwnACv.js
var import_jsx_runtime = require_jsx_runtime();
function IncidentsPage() {
	const misses = useAppStore((s) => s.incidents).filter((i) => i.kind !== "administered");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-widest text-muted uppercase",
			children: "Quality · Medical 4B"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: "Near-miss register"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: "Every hard stop is written here with the ordered pack, the scanned pack, and the nurse on the shift. This is the report a matron takes to the Monday meeting."
		}),
		misses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-xl bg-surface p-8 text-center shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "No near-misses yet this shift."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Open Devon Reid and scan hydromorphone against morphine to plant the first one."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/scan/$patientId/$orderId",
					params: {
						patientId: "p-devon",
						orderId: "o-devon-morphine"
					},
					className: "mt-4 inline-flex h-11 items-center text-sm font-medium text-primary",
					children: "Run the hydromorphone trap"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid gap-3",
			children: misses.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentRow, { row }, row.id))
		})
	] });
}
function IncidentRow({ row }) {
	const patient = patients.find((p) => p.id === row.patientId);
	const tone = row.kind === "override" ? "blocked" : row.kind === "match" ? "given" : "overdue";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: tone,
					children: row.kind.replace("-", " ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tabular-nums text-muted",
					children: jamaicaNow(new Date(row.at))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-semibold",
				children: patient?.name ?? row.patientId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: row.detail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs text-muted",
				children: [
					"Ordered ",
					row.prescribedLabel,
					" · scanned ",
					row.scannedLabel,
					" · ",
					row.nurse
				]
			})
		]
	});
}
//#endregion
export { IncidentsPage as component };
