import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn } from "./button-CgvJkGh_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DBKU_a7_.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-ink/8 text-ink",
		due: "bg-warn-soft text-warn",
		overdue: "bg-danger-soft text-danger",
		given: "bg-success-soft text-success",
		blocked: "bg-danger text-danger-fg",
		allergy: "bg-danger-soft text-danger",
		cd: "bg-cd text-paper",
		teal: "bg-primary-soft text-primary",
		paper: "bg-ink-3 text-paper"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
