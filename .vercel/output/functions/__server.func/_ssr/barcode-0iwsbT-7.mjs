import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn } from "./button-CgvJkGh_.mjs";
import { t as require_JsBarcode } from "../_libs/jsbarcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/barcode-0iwsbT-7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_JsBarcode = /* @__PURE__ */ __toESM(require_JsBarcode());
function Barcode({ value, className, lineColor = "#12202b", height = 42 }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!ref.current || !value) return;
		try {
			(0, import_JsBarcode.default)(ref.current, value, {
				format: "CODE128",
				displayValue: true,
				font: "IBM Plex Mono, ui-monospace, monospace",
				fontSize: 12,
				height,
				margin: 0,
				lineColor,
				background: "transparent",
				width: 1.6
			});
		} catch {}
	}, [
		value,
		lineColor,
		height
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		ref,
		className: cn("max-w-full", className),
		role: "img",
		"aria-label": `Barcode ${value}`
	});
}
//#endregion
export { Barcode as t };
