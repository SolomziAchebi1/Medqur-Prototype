import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-r1p9Zho0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var SHIFT_START = Date.parse("2026-08-27T06:30:00-05:00");
var minutesFromNow = (mins) => new Date(SHIFT_START + mins * 6e4).toISOString();
var HOSPITAL = "Kingston General Teaching Hospital";
var WARD = "Medical 4B";
var defaultSession = {
	nurse: "Nadine Clarke",
	role: "Staff Nurse",
	hospital: HOSPITAL,
	ward: WARD
};
var medications = [
	{
		id: "morphine-4",
		barcode: "10041",
		brand: "Morphine Sulfate",
		generic: "morphine",
		strength: "4 mg/mL",
		strengthMg: 4,
		form: "ampoule",
		route: "IV",
		controlled: true,
		lookAlikeOf: "hydromorphone-4",
		notes: "Controlled drug. 1 mL ampoule."
	},
	{
		id: "hydromorphone-4",
		barcode: "10042",
		brand: "Hydromorphone",
		generic: "hydromorphone",
		strength: "4 mg/mL",
		strengthMg: 4,
		form: "ampoule",
		route: "IV",
		controlled: true,
		lookAlikeOf: "morphine-4",
		notes: "7× more potent than morphine. Classic look-alike trap."
	},
	{
		id: "paracetamol-1g",
		barcode: "20011",
		brand: "Paracetamol",
		generic: "paracetamol",
		strength: "1 g/100 mL",
		strengthMg: 1e3,
		form: "infusion",
		route: "IV",
		controlled: false
	},
	{
		id: "ondansetron-4",
		barcode: "20022",
		brand: "Ondansetron",
		generic: "ondansetron",
		strength: "4 mg/2 mL",
		strengthMg: 4,
		form: "ampoule",
		route: "IV",
		controlled: false
	},
	{
		id: "amlodipine-5",
		barcode: "30015",
		brand: "Amlodipine",
		generic: "amlodipine",
		strength: "5 mg",
		strengthMg: 5,
		form: "tablet",
		route: "PO",
		controlled: false
	},
	{
		id: "metformin-500",
		barcode: "30050",
		brand: "Metformin",
		generic: "metformin",
		strength: "500 mg",
		strengthMg: 500,
		form: "tablet",
		route: "PO",
		controlled: false,
		lookAlikeOf: "metformin-850"
	},
	{
		id: "metformin-850",
		barcode: "30085",
		brand: "Metformin",
		generic: "metformin",
		strength: "850 mg",
		strengthMg: 850,
		form: "tablet",
		route: "PO",
		controlled: false,
		lookAlikeOf: "metformin-500"
	},
	{
		id: "coamoxiclav-12",
		barcode: "40120",
		brand: "Co-amoxiclav",
		generic: "amoxicillin-clavulanate",
		strength: "1.2 g",
		strengthMg: 1200,
		form: "vial",
		route: "IV",
		controlled: false,
		notes: "Contains penicillin."
	},
	{
		id: "amoxicillin-500",
		barcode: "40500",
		brand: "Amoxicillin",
		generic: "amoxicillin",
		strength: "500 mg",
		strengthMg: 500,
		form: "capsule",
		route: "PO",
		controlled: false,
		notes: "Penicillin class."
	},
	{
		id: "amox-susp",
		barcode: "40750",
		brand: "Amoxicillin",
		generic: "amoxicillin",
		strength: "250 mg/5 mL",
		strengthMg: 250,
		form: "suspension",
		route: "PO",
		controlled: false
	},
	{
		id: "azithromycin-500",
		barcode: "40800",
		brand: "Azithromycin",
		generic: "azithromycin",
		strength: "500 mg",
		strengthMg: 500,
		form: "vial",
		route: "IV",
		controlled: false
	},
	{
		id: "fluclox-500",
		barcode: "40900",
		brand: "Flucloxacillin",
		generic: "flucloxacillin",
		strength: "500 mg",
		strengthMg: 500,
		form: "capsule",
		route: "PO",
		controlled: false,
		notes: "Penicillin class. Do not give if penicillin-allergic."
	},
	{
		id: "kcl-20",
		barcode: "50020",
		brand: "Potassium chloride",
		generic: "potassium chloride",
		strength: "20 mmol/10 mL",
		strengthMg: 20,
		form: "ampoule",
		route: "IV",
		controlled: true,
		lookAlikeOf: "nacl-flush",
		notes: "High-alert. Never give undiluted IV push."
	},
	{
		id: "nacl-flush",
		barcode: "50009",
		brand: "Sodium chloride 0.9%",
		generic: "sodium chloride",
		strength: "10 mL",
		strengthMg: 0,
		form: "ampoule",
		route: "IV",
		controlled: false,
		lookAlikeOf: "kcl-20"
	},
	{
		id: "oxytocin-10",
		barcode: "60010",
		brand: "Oxytocin",
		generic: "oxytocin",
		strength: "10 IU/mL",
		strengthMg: 10,
		form: "ampoule",
		route: "IV",
		controlled: false
	},
	{
		id: "ferrous-200",
		barcode: "60020",
		brand: "Ferrous sulfate",
		generic: "ferrous sulfate",
		strength: "200 mg",
		strengthMg: 200,
		form: "tablet",
		route: "PO",
		controlled: false
	},
	{
		id: "aspirin-75",
		barcode: "70075",
		brand: "Aspirin e/c",
		generic: "aspirin",
		strength: "75 mg",
		strengthMg: 75,
		form: "tablet",
		route: "PO",
		controlled: false,
		lookAlikeOf: "aspirin-300"
	},
	{
		id: "aspirin-300",
		barcode: "70300",
		brand: "Aspirin",
		generic: "aspirin",
		strength: "300 mg",
		strengthMg: 300,
		form: "tablet",
		route: "PO",
		controlled: false,
		lookAlikeOf: "aspirin-75"
	},
	{
		id: "atorva-40",
		barcode: "70040",
		brand: "Atorvastatin",
		generic: "atorvastatin",
		strength: "40 mg",
		strengthMg: 40,
		form: "tablet",
		route: "PO",
		controlled: false
	},
	{
		id: "gtn-spray",
		barcode: "70400",
		brand: "GTN spray",
		generic: "glyceryl trinitrate",
		strength: "400 mcg",
		strengthMg: .4,
		form: "spray",
		route: "SL",
		controlled: false
	},
	{
		id: "hydralazine-25",
		barcode: "80026",
		brand: "Hydralazine",
		generic: "hydralazine",
		strength: "25 mg",
		strengthMg: 25,
		form: "tablet",
		route: "PO",
		controlled: false,
		lookAlikeOf: "hydroxyzine-25"
	},
	{
		id: "hydroxyzine-25",
		barcode: "80025",
		brand: "Hydroxyzine",
		generic: "hydroxyzine",
		strength: "25 mg",
		strengthMg: 25,
		form: "tablet",
		route: "PO",
		controlled: false,
		lookAlikeOf: "hydralazine-25",
		notes: "Antihistamine. Sound-alike with hydralazine."
	},
	{
		id: "insulin-nph",
		barcode: "90010",
		brand: "Humulin N",
		generic: "insulin isophane",
		strength: "100 IU/mL",
		strengthMg: 100,
		form: "insulin",
		route: "SC",
		controlled: true,
		lookAlikeOf: "insulin-r"
	},
	{
		id: "insulin-r",
		barcode: "90011",
		brand: "Humulin R",
		generic: "insulin regular",
		strength: "100 IU/mL",
		strengthMg: 100,
		form: "insulin",
		route: "SC",
		controlled: true,
		lookAlikeOf: "insulin-nph"
	}
];
var patients = [
	{
		id: "p-devon",
		mrn: "48291014",
		wristband: "W48291014",
		name: "Devon Reid",
		sex: "M",
		dob: "1984-03-12",
		ward: WARD,
		bed: "4B-12",
		allergies: ["None known"],
		diagnosis: "Day 1 post laparotomy — pain and nausea",
		consultant: "Dr A. Grant"
	},
	{
		id: "p-marcia",
		mrn: "47110283",
		wristband: "W47110283",
		name: "Marcia Campbell",
		sex: "F",
		dob: "1959-11-02",
		ward: WARD,
		bed: "4B-03",
		allergies: ["Sulfa"],
		diagnosis: "Type 2 diabetes, hypertension — ward review",
		consultant: "Dr S. Persaud"
	},
	{
		id: "p-joseph",
		mrn: "39044117",
		wristband: "W39044117",
		name: "Joseph Brown",
		sex: "M",
		dob: "1945-07-19",
		ward: WARD,
		bed: "4B-07",
		allergies: ["Penicillin"],
		diagnosis: "Community-acquired pneumonia",
		consultant: "Dr A. Grant"
	},
	{
		id: "p-shanice",
		mrn: "51288340",
		wristband: "W51288340",
		name: "Shanice Williams",
		sex: "F",
		dob: "1998-01-28",
		ward: WARD,
		bed: "4B-18",
		allergies: ["None known"],
		diagnosis: "Day 0 postpartum — uterine atony watch",
		consultant: "Dr M. Barrett"
	},
	{
		id: "p-aisha",
		mrn: "60822109",
		wristband: "W60822109",
		name: "Aisha Mohammed",
		sex: "F",
		dob: "2017-05-04",
		ward: WARD,
		bed: "4B-21",
		allergies: ["None known"],
		diagnosis: "Otitis media — paediatric dose",
		consultant: "Dr L. Chin",
		weightKg: 28
	},
	{
		id: "p-rohan",
		mrn: "35501992",
		wristband: "W35501992",
		name: "Rohan Barrett",
		sex: "M",
		dob: "1971-09-08",
		ward: WARD,
		bed: "4B-09",
		allergies: ["None known"],
		diagnosis: "NSTEMI — medical management",
		consultant: "Dr S. Persaud"
	},
	{
		id: "p-loretta",
		mrn: "22918873",
		wristband: "W22918873",
		name: "Loretta Chin",
		sex: "F",
		dob: "1953-02-14",
		ward: WARD,
		bed: "4B-05",
		allergies: ["ACE inhibitors — cough"],
		diagnosis: "Hypertensive urgency, step-down",
		consultant: "Dr A. Grant"
	},
	{
		id: "p-patrick",
		mrn: "40177625",
		wristband: "W40177625",
		name: "Patrick Lewis",
		sex: "M",
		dob: "1965-12-01",
		ward: WARD,
		bed: "4B-14",
		allergies: ["None known"],
		diagnosis: "New type 2 diabetes — insulin start",
		consultant: "Dr S. Persaud"
	},
	{
		id: "p-gloria",
		mrn: "31844002",
		wristband: "W31844002",
		name: "Gloria Thompson",
		sex: "F",
		dob: "1968-06-22",
		ward: WARD,
		bed: "4B-16",
		allergies: ["Penicillin"],
		diagnosis: "Cellulitis — prescribing error planted in the chart",
		consultant: "Dr A. Grant"
	}
];
var seedOrders = () => [
	{
		id: "o-devon-morphine",
		patientId: "p-devon",
		medicationId: "morphine-4",
		generic: "morphine",
		displayName: "Morphine sulfate",
		dose: "4 mg",
		doseMg: 4,
		route: "IV",
		frequency: "q4h PRN pain",
		dueAt: minutesFromNow(-18),
		status: "overdue",
		prescribedBy: "Dr A. Grant",
		indication: "Post-op pain"
	},
	{
		id: "o-devon-para",
		patientId: "p-devon",
		medicationId: "paracetamol-1g",
		generic: "paracetamol",
		displayName: "Paracetamol",
		dose: "1 g",
		doseMg: 1e3,
		route: "IV",
		frequency: "q6h",
		dueAt: minutesFromNow(12),
		status: "due",
		prescribedBy: "Dr A. Grant"
	},
	{
		id: "o-devon-ond",
		patientId: "p-devon",
		medicationId: "ondansetron-4",
		generic: "ondansetron",
		displayName: "Ondansetron",
		dose: "4 mg",
		doseMg: 4,
		route: "IV",
		frequency: "q8h PRN nausea",
		dueAt: minutesFromNow(40),
		status: "due",
		prescribedBy: "Dr A. Grant"
	},
	{
		id: "o-marcia-amlo",
		patientId: "p-marcia",
		medicationId: "amlodipine-5",
		generic: "amlodipine",
		displayName: "Amlodipine",
		dose: "5 mg",
		doseMg: 5,
		route: "PO",
		frequency: "once daily",
		dueAt: minutesFromNow(-5),
		status: "due",
		prescribedBy: "Dr S. Persaud"
	},
	{
		id: "o-marcia-met",
		patientId: "p-marcia",
		medicationId: "metformin-500",
		generic: "metformin",
		displayName: "Metformin",
		dose: "500 mg",
		doseMg: 500,
		route: "PO",
		frequency: "twice daily with food",
		dueAt: minutesFromNow(-5),
		status: "due",
		prescribedBy: "Dr S. Persaud"
	},
	{
		id: "o-joseph-azith",
		patientId: "p-joseph",
		medicationId: "azithromycin-500",
		generic: "azithromycin",
		displayName: "Azithromycin",
		dose: "500 mg",
		doseMg: 500,
		route: "IV",
		frequency: "once daily",
		dueAt: minutesFromNow(-32),
		status: "overdue",
		prescribedBy: "Dr A. Grant",
		indication: "CAP — penicillin-allergic"
	},
	{
		id: "o-joseph-nacl",
		patientId: "p-joseph",
		medicationId: "nacl-flush",
		generic: "sodium chloride",
		displayName: "Sodium chloride 0.9% flush",
		dose: "10 mL",
		doseMg: 0,
		route: "IV",
		frequency: "with IV meds",
		dueAt: minutesFromNow(-32),
		status: "due",
		prescribedBy: "Dr A. Grant"
	},
	{
		id: "o-shanice-oxy",
		patientId: "p-shanice",
		medicationId: "oxytocin-10",
		generic: "oxytocin",
		displayName: "Oxytocin",
		dose: "10 IU",
		doseMg: 10,
		route: "IV",
		frequency: "infusion — sliding",
		dueAt: minutesFromNow(8),
		status: "due",
		prescribedBy: "Dr M. Barrett"
	},
	{
		id: "o-shanice-fe",
		patientId: "p-shanice",
		medicationId: "ferrous-200",
		generic: "ferrous sulfate",
		displayName: "Ferrous sulfate",
		dose: "200 mg",
		doseMg: 200,
		route: "PO",
		frequency: "once daily",
		dueAt: minutesFromNow(90),
		status: "due",
		prescribedBy: "Dr M. Barrett"
	},
	{
		id: "o-aisha-amox",
		patientId: "p-aisha",
		medicationId: "amox-susp",
		generic: "amoxicillin",
		displayName: "Amoxicillin suspension",
		dose: "7.5 mL (375 mg)",
		doseMg: 250,
		route: "PO",
		frequency: "three times daily",
		dueAt: minutesFromNow(-8),
		status: "due",
		prescribedBy: "Dr L. Chin",
		indication: "Weight-based paediatric dose, 28 kg"
	},
	{
		id: "o-rohan-asa",
		patientId: "p-rohan",
		medicationId: "aspirin-75",
		generic: "aspirin",
		displayName: "Aspirin e/c",
		dose: "75 mg",
		doseMg: 75,
		route: "PO",
		frequency: "once daily",
		dueAt: minutesFromNow(-2),
		status: "due",
		prescribedBy: "Dr S. Persaud"
	},
	{
		id: "o-rohan-statin",
		patientId: "p-rohan",
		medicationId: "atorva-40",
		generic: "atorvastatin",
		displayName: "Atorvastatin",
		dose: "40 mg",
		doseMg: 40,
		route: "PO",
		frequency: "at night",
		dueAt: minutesFromNow(180),
		status: "due",
		prescribedBy: "Dr S. Persaud"
	},
	{
		id: "o-loretta-hydral",
		patientId: "p-loretta",
		medicationId: "hydralazine-25",
		generic: "hydralazine",
		displayName: "Hydralazine",
		dose: "25 mg",
		doseMg: 25,
		route: "PO",
		frequency: "three times daily",
		dueAt: minutesFromNow(-14),
		status: "overdue",
		prescribedBy: "Dr A. Grant"
	},
	{
		id: "o-patrick-nph",
		patientId: "p-patrick",
		medicationId: "insulin-nph",
		generic: "insulin isophane",
		displayName: "Humulin N (NPH)",
		dose: "12 units",
		doseMg: 100,
		route: "SC",
		frequency: "morning",
		dueAt: minutesFromNow(-40),
		status: "overdue",
		prescribedBy: "Dr S. Persaud"
	},
	{
		id: "o-gloria-fluclox",
		patientId: "p-gloria",
		medicationId: "fluclox-500",
		generic: "flucloxacillin",
		displayName: "Flucloxacillin",
		dose: "500 mg",
		doseMg: 500,
		route: "PO",
		frequency: "four times daily",
		dueAt: minutesFromNow(-11),
		status: "overdue",
		prescribedBy: "Dr A. Grant",
		indication: "Planted prescribing error — patient is penicillin-allergic"
	}
];
var seedIncidents = [];
var trolleyForOrder = (order) => {
	return {
		"o-devon-morphine": [
			"morphine-4",
			"hydromorphone-4",
			"ondansetron-4",
			"nacl-flush"
		],
		"o-devon-para": [
			"paracetamol-1g",
			"nacl-flush",
			"ondansetron-4"
		],
		"o-devon-ond": [
			"ondansetron-4",
			"morphine-4",
			"nacl-flush"
		],
		"o-marcia-amlo": [
			"amlodipine-5",
			"hydralazine-25",
			"metformin-500"
		],
		"o-marcia-met": [
			"metformin-500",
			"metformin-850",
			"amlodipine-5"
		],
		"o-joseph-azith": [
			"azithromycin-500",
			"coamoxiclav-12",
			"amoxicillin-500",
			"nacl-flush"
		],
		"o-joseph-nacl": [
			"nacl-flush",
			"kcl-20",
			"azithromycin-500"
		],
		"o-shanice-oxy": [
			"oxytocin-10",
			"nacl-flush",
			"ondansetron-4"
		],
		"o-shanice-fe": [
			"ferrous-200",
			"amlodipine-5",
			"metformin-500"
		],
		"o-aisha-amox": [
			"amox-susp",
			"amoxicillin-500",
			"coamoxiclav-12"
		],
		"o-rohan-asa": [
			"aspirin-75",
			"aspirin-300",
			"atorva-40"
		],
		"o-rohan-statin": [
			"atorva-40",
			"aspirin-75",
			"amlodipine-5"
		],
		"o-loretta-hydral": [
			"hydralazine-25",
			"hydroxyzine-25",
			"amlodipine-5"
		],
		"o-patrick-nph": [
			"insulin-nph",
			"insulin-r",
			"nacl-flush"
		],
		"o-gloria-fluclox": [
			"fluclox-500",
			"azithromycin-500",
			"amoxicillin-500",
			"coamoxiclav-12"
		]
	}[order.id] ?? [order.medicationId];
};
var fresh = () => ({
	session: { ...defaultSession },
	orders: seedOrders(),
	incidents: [...seedIncidents]
});
var useAppStore = create()(persist((set, get) => ({
	...fresh(),
	hydrated: false,
	setHydrated: (v) => set({ hydrated: v }),
	setSession: (patch) => set({ session: {
		...get().session,
		...patch
	} }),
	resetDemo: () => set({ ...fresh() }),
	addOrder: (order) => set({ orders: [order, ...get().orders] }),
	markGiven: (orderId) => set({ orders: get().orders.map((o) => o.id === orderId ? {
		...o,
		status: "given"
	} : o) }),
	markBlocked: (orderId) => set({ orders: get().orders.map((o) => o.id === orderId ? {
		...o,
		status: "blocked"
	} : o) }),
	logIncident: (incident) => {
		set({ incidents: [{
			...incident,
			id: `i-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
			at: (/* @__PURE__ */ new Date()).toISOString(),
			nurse: get().session.nurse
		}, ...get().incidents] });
	}
}), {
	name: "doselock-kgh-v1",
	skipHydration: true,
	partialize: (s) => ({
		session: s.session,
		orders: s.orders,
		incidents: s.incidents
	})
}));
function patientById(id) {
	return patients.find((p) => p.id === id);
}
function HydrateStore() {
	const setHydrated = useAppStore((s) => s.setHydrated);
	(0, import_react.useEffect)(() => {
		Promise.resolve(useAppStore.persist.rehydrate()).finally(() => setHydrated(true));
	}, [setHydrated]);
	return null;
}
var styles_default = "/assets/styles-DNu3vW1K.css";
var APP_NAME = "DoseLock";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "DoseLock is bedside barcode verification for Jamaican hospitals. Scan the pack. Match the order. Stop the wrong dose."
			},
			{
				name: "theme-color",
				content: "#0e1a24"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en-JM",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateStore, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$6 = () => import("./routes-C1tDY0s_.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./formulary-CYdYb_Y-.mjs");
var Route$5 = createFileRoute("/formulary")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./incidents-DnpwnACv.mjs");
var Route$4 = createFileRoute("/incidents")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./orders-Bo-bCpcC.mjs");
var Route$3 = createFileRoute("/orders")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./ward-BGRT6Owg.mjs");
var Route$2 = createFileRoute("/ward")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./patient._id-DeA2Nnk3.mjs");
var Route$1 = createFileRoute("/patient/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./scan._patientId._orderId-BDlKYesY.mjs");
var Route = createFileRoute("/scan/$patientId/$orderId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	FormularyRoute: Route$5.update({
		id: "/formulary",
		path: "/formulary",
		getParentRoute: () => Route$7
	}),
	IncidentsRoute: Route$4.update({
		id: "/incidents",
		path: "/incidents",
		getParentRoute: () => Route$7
	}),
	OrdersRoute: Route$3.update({
		id: "/orders",
		path: "/orders",
		getParentRoute: () => Route$7
	}),
	WardRoute: Route$2.update({
		id: "/ward",
		path: "/ward",
		getParentRoute: () => Route$7
	}),
	PatientIdRoute: Route$1.update({
		id: "/patient/$id",
		path: "/patient/$id",
		getParentRoute: () => Route$7
	}),
	ScanPatientIdOrderIdRoute: Route.update({
		id: "/scan/$patientId/$orderId",
		path: "/scan/$patientId/$orderId",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useAppStore as a, trolleyForOrder as c, patientById as i, Route as n, medications as o, Route$1 as r, patients as s, router_exports as t };
