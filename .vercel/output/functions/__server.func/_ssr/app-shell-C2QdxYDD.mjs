import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ShieldAlert, d as RotateCcw, f as Pill, h as ClipboardList, i as Users } from "../_libs/lucide-react.mjs";
import { a as useAppStore } from "./router-r1p9Zho0.mjs";
import { a as jamaicaNow, i as cn, n as Wordmark, t as Button } from "./button-CgvJkGh_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-C2QdxYDD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/ward",
		label: "Ward",
		icon: Users
	},
	{
		to: "/formulary",
		label: "Formulary",
		icon: Pill
	},
	{
		to: "/orders",
		label: "Orders",
		icon: ClipboardList
	},
	{
		to: "/incidents",
		label: "Near-misses",
		icon: ShieldAlert
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const session = useAppStore((s) => s.session);
	const resetDemo = useAppStore((s) => s.resetDemo);
	const [clock, setClock] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setClock(jamaicaNow());
		const id = window.setInterval(() => setClock(jamaicaNow()), 15e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh overflow-x-hidden bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-30 overflow-x-hidden border-b border-ink-3 bg-ink text-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-w-0 max-w-6xl items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { inverted: true })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden min-w-0 flex-1 sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-paper/70",
							children: session.hospital
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: session.ward
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto min-w-0 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tabular-nums text-paper/70",
							children: clock
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-sm",
							children: [session.nurse, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-paper/60",
								children: [" · ", session.role]
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex w-full min-w-0 max-w-6xl gap-1 overflow-x-auto px-3 pb-2",
				children: [NAV.map((item) => {
					const active = item.to === "/ward" ? pathname === "/ward" || pathname.startsWith("/patient") || pathname.startsWith("/scan") : pathname === item.to || pathname.startsWith(`${item.to}/`);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors duration-150", active ? "bg-ink-3 text-paper" : "text-paper/70 hover:bg-ink-2 hover:text-paper"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "ml-auto h-11 shrink-0 text-paper/70 hover:bg-ink-2 hover:text-paper",
					onClick: () => resetDemo(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Reset demo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sm:hidden",
							children: "Reset"
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto min-w-0 max-w-6xl px-4 py-6",
			children
		})]
	});
}
//#endregion
export { AppShell as t };
