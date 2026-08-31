import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as ArrowLeft, u as ScanLine } from "../_libs/lucide-react.mjs";
import { a as useAppStore, i as patientById, r as Route$1 } from "./router-r1p9Zho0.mjs";
import { o as jamaicaTime, r as ageFromDob, t as Button } from "./button-CgvJkGh_.mjs";
import { t as AppShell } from "./app-shell-C2QdxYDD.mjs";
import { t as Barcode } from "./barcode-0iwsbT-7.mjs";
import { t as Badge } from "./badge-DBKU_a7_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patient._id-DeA2Nnk3.js
var import_jsx_runtime = require_jsx_runtime();
function PatientPage() {
	const { id } = Route$1.useParams();
	const patient = patientById(id);
	const orders = useAppStore((s) => s.orders).filter((o) => o.patientId === id);
	if (!patient) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Patient not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/ward",
		className: "text-primary",
		children: "Back to ward"
	})] });
	const allergic = patient.allergies.filter((a) => !a.toLowerCase().includes("none"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/ward",
			className: "inline-flex items-center gap-1 text-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Ward board"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tracking-widest text-muted uppercase",
						children: [
							patient.bed,
							" · ",
							patient.ward
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-2xl font-semibold tracking-tight",
						children: patient.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							patient.sex,
							" · ",
							ageFromDob(patient.dob),
							" years · DOB",
							" ",
							patient.dob,
							patient.weightKg ? ` · ${patient.weightKg} kg` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: patient.diagnosis
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-subtle",
						children: [
							"Consultant ",
							patient.consultant,
							" · MRN ",
							patient.mrn
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-paper px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-widest text-muted uppercase",
						children: "Wristband"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barcode, {
						value: patient.wristband,
						height: 32
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: allergic.length ? allergic.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "allergy",
					children: ["Allergy · ", a]
				}, a)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "NKDA" })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-lg font-semibold",
			children: "Medication orders"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-3",
			children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-semibold",
								children: o.displayName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-sm tabular-nums",
							children: [
								o.dose,
								" · ",
								o.route,
								" · ",
								o.frequency
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								o.prescribedBy,
								o.indication ? ` · ${o.indication}` : "",
								" · due",
								" ",
								jamaicaTime(new Date(o.dueAt))
							]
						})
					] }), o.status === "given" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "given",
						children: "Given"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/scan/$patientId/$orderId",
							params: {
								patientId: patient.id,
								orderId: o.id
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "size-4" }), "Scan to administer"]
						})
					})]
				})
			}, o.id))
		})
	] });
}
function StatusBadge({ status }) {
	if (status === "overdue") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "overdue",
		children: "Overdue"
	});
	if (status === "due") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "due",
		children: "Due"
	});
	if (status === "given") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "given",
		children: "Given"
	});
	if (status === "blocked") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "blocked",
		children: "Held"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: status });
}
//#endregion
export { PatientPage as component };
