import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CgvJkGh_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function jamaicaNow(date = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-JM", {
		timeZone: "America/Jamaica",
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true
	}).format(date);
}
function jamaicaTime(date = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-JM", {
		timeZone: "America/Jamaica",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true
	}).format(date);
}
function ageFromDob(dob) {
	const birth = new Date(dob);
	const now = /* @__PURE__ */ new Date();
	let age = now.getFullYear() - birth.getFullYear();
	const m = now.getMonth() - birth.getMonth();
	if (m < 0 || m === 0 && now.getDate() < birth.getDate()) age -= 1;
	return age;
}
function DoseLockMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11 14.5V11.2a5 5 0 0 1 10 0v3.3",
				fill: "none",
				stroke: "#f4f1ea",
				strokeWidth: "2.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "14.5",
				width: "16",
				height: "12.5",
				rx: "2.5",
				fill: "#0f6e68"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "10.2",
				y: "17.2",
				width: "1.5",
				height: "7",
				rx: "0.4",
				fill: "#f4f1ea"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "13.2",
				y: "17.2",
				width: "1.5",
				height: "7",
				rx: "0.4",
				fill: "#f4f1ea"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16.2",
				y: "17.2",
				width: "1.5",
				height: "7",
				rx: "0.4",
				fill: "#f4f1ea"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "19.2",
				y: "17.2",
				width: "2.4",
				height: "7",
				rx: "0.4",
				fill: "#f4f1ea"
			})
		]
	});
}
function Wordmark({ inverted = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoseLockMark, { className: inverted ? "text-paper" : "text-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-semibold tracking-tight", inverted ? "text-paper" : "text-ink"),
			children: "DoseLock"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-sm hover:bg-primary/90",
			ink: "bg-ink text-paper hover:bg-ink-2",
			outline: "border border-border-strong bg-surface text-fg hover:bg-bg-warm",
			ghost: "text-fg hover:bg-bg-warm",
			danger: "bg-danger text-danger-fg hover:bg-danger-deep",
			success: "bg-success text-success-fg hover:bg-success-deep",
			paper: "bg-paper text-ink hover:bg-bg"
		},
		size: {
			sm: "h-9 px-3",
			default: "h-11 px-4",
			lg: "h-12 px-5 text-base",
			xl: "h-14 px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { jamaicaNow as a, cn as i, Wordmark as n, jamaicaTime as o, ageFromDob as r, Button as t };
