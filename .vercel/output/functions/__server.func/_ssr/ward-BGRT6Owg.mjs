import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TriangleAlert, g as ChevronRight, l as Search } from "../_libs/lucide-react.mjs";
import { a as useAppStore, s as patients } from "./router-r1p9Zho0.mjs";
import { r as ageFromDob } from "./button-CgvJkGh_.mjs";
import { t as AppShell } from "./app-shell-C2QdxYDD.mjs";
import { t as Badge } from "./badge-DBKU_a7_.mjs";
import { t as Input } from "./input-BWojBZUQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ward-BGRT6Owg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WardPage() {
	const orders = useAppStore((s) => s.orders);
	const incidents = useAppStore((s) => s.incidents);
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return patients.map((p) => {
			const due = orders.filter((o) => o.patientId === p.id && (o.status === "due" || o.status === "overdue"));
			const overdue = due.filter((o) => o.status === "overdue").length;
			return {
				p,
				due: due.length,
				overdue
			};
		}).filter(({ p }) => {
			if (!query) return true;
			return p.name.toLowerCase().includes(query) || p.mrn.includes(query) || p.bed.toLowerCase().includes(query);
		}).sort((a, b) => b.overdue - a.overdue || b.due - a.due);
	}, [orders, q]);
	const dueCount = orders.filter((o) => o.status === "due" || o.status === "overdue").length;
	const givenCount = orders.filter((o) => o.status === "given").length;
	const missCount = incidents.filter((i) => i.kind !== "administered" && i.kind !== "match").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-muted uppercase",
				children: "Kingston General · Medical 4B"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Ward board"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2 text-sm sm:mt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						label: "Due",
						value: dueCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						label: "Given",
						value: givenCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						label: "Near-miss",
						value: missCount,
						warn: missCount > 0
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search name, MRN, or bed",
				className: "pl-10"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-3",
			children: rows.map(({ p, due, overdue }) => {
				const allergic = p.allergies.some((a) => !a.toLowerCase().includes("none"));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/patient/$id",
					params: { id: p.id },
					className: "flex items-center gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[transform,background-color] duration-150 hover:bg-bg-warm active:scale-[0.99]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex size-12 shrink-0 flex-col items-center justify-center rounded-md bg-ink text-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] tracking-wide opacity-70",
								children: "BED"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs font-medium",
								children: p.bed.replace("4B-", "")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-semibold",
											children: p.name
										}),
										overdue > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "overdue",
											children: "Overdue"
										}) : null,
										allergic ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "allergy",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mr-1 size-3" }), "Allergy"]
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 truncate text-sm text-muted",
									children: [
										p.sex,
										" · ",
										ageFromDob(p.dob),
										"y · MRN ",
										p.mrn
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-subtle",
									children: p.diagnosis
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden text-right sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-sm tabular-nums",
								children: [due, " due"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-subtle" })
					]
				}) }, p.id);
			})
		})
	] });
}
function Chip({ label, value, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: warn ? "rounded-md bg-danger-soft px-3 py-1.5" : "rounded-md bg-surface px-3 py-1.5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted",
			children: [label, " "]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono font-medium tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { WardPage as component };
