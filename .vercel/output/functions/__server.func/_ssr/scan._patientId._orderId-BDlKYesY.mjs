import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as ArrowLeft, _ as Check, c as ShieldAlert, m as Keyboard, n as VolumeX, p as LayoutGrid, r as Volume2, t as X, v as Camera } from "../_libs/lucide-react.mjs";
import { a as useAppStore, c as trolleyForOrder, i as patientById, n as Route, o as medications } from "./router-r1p9Zho0.mjs";
import { i as cn, r as ageFromDob, t as Button } from "./button-CgvJkGh_.mjs";
import { t as AppShell } from "./app-shell-C2QdxYDD.mjs";
import { t as Badge } from "./badge-DBKU_a7_.mjs";
import { t as MedPack } from "./med-pack-Dc1qgW-U.mjs";
import { t as Input } from "./input-BWojBZUQ.mjs";
import { t as Label } from "./label-CBHCdkyL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scan._patientId._orderId-BDlKYesY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ctx = null;
var alarmTimer = null;
var active = [];
function audio() {
	if (!ctx) ctx = new AudioContext();
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function stopNodes() {
	for (const n of active) try {
		n.disconnect();
	} catch {}
	active = [];
}
function stopAlarm() {
	if (alarmTimer != null) {
		window.clearInterval(alarmTimer);
		alarmTimer = null;
	}
	stopNodes();
}
function beep(frequency, start, duration, gain = .22) {
	const ac = audio();
	const osc = ac.createOscillator();
	const g = ac.createGain();
	osc.type = "square";
	osc.frequency.value = frequency;
	g.gain.setValueAtTime(1e-4, start);
	g.gain.exponentialRampToValueAtTime(gain, start + .012);
	g.gain.exponentialRampToValueAtTime(1e-4, start + duration);
	osc.connect(g);
	g.connect(ac.destination);
	osc.start(start);
	osc.stop(start + duration + .02);
	active.push(osc, g);
}
function burst() {
	const t = audio().currentTime + .01;
	beep(960, t, .16, .28);
	beep(770, t + .2, .16, .28);
	beep(960, t + .4, .18, .3);
}
function startMismatchAlarm() {
	stopAlarm();
	burst();
	alarmTimer = window.setInterval(burst, 900);
}
function playMatchChime() {
	stopAlarm();
	const t = audio().currentTime + .01;
	beep(523.25, t, .12, .12);
	beep(659.25, t + .12, .12, .12);
	beep(783.99, t + .24, .22, .14);
}
function playClick() {
	beep(1400, audio().currentTime, .04, .05);
}
function MatchOverlay({ result, onGive, onCancel }) {
	(0, import_react.useEffect)(() => {
		playMatchChime();
		return () => stopAlarm();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "match-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-success-deep/80 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "match-in w-full max-w-lg rounded-xl bg-success-fg p-6 text-fg shadow-2xl sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex size-14 items-center justify-center rounded-full bg-success text-success-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-8",
							strokeWidth: 2.6
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.2em] text-success",
						children: "DOSELOCK · MATCH"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "match-title",
						className: "text-3xl font-semibold tracking-tight text-success-deep sm:text-4xl",
						children: result.title
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg font-medium text-ink",
					children: result.headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: result.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 grid grid-cols-2 gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-success-soft p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "Patient"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold",
								children: result.patient.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-mono text-xs",
								children: result.patient.mrn
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-success-soft p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "Dose"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-semibold",
								children: [
									result.order.dose,
									" ",
									result.order.route
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-xs",
								children: result.order.frequency
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "success",
						size: "xl",
						className: "flex-1",
						onClick: onGive,
						children: "Record as given"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "xl",
						onClick: onCancel,
						children: "Cancel"
					})]
				})
			]
		})
	});
}
function Scanner({ order, onScan }) {
	const [mode, setMode] = (0, import_react.useState)("trolley");
	const packs = trolleyForOrder(order).map((id) => medications.find((m) => m.id === id)).filter((m) => Boolean(m));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex rounded-lg bg-bg-warm p-1",
			children: [
				[
					"trolley",
					LayoutGrid,
					"Trolley"
				],
				[
					"camera",
					Camera,
					"Camera"
				],
				[
					"keypad",
					Keyboard,
					"Keypad"
				]
			].map(([id, Icon, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setMode(id),
				className: cn("flex h-11 flex-1 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors duration-150", mode === id ? "bg-surface text-ink shadow-sm" : "text-muted"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
			}, id))
		}),
		mode === "trolley" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2",
			children: packs.map((med) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedPack, {
				med,
				onScan
			}, med.id))
		}) : null,
		mode === "camera" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraScan, { onScan }) : null,
		mode === "keypad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeypadScan, { onScan }) : null
	] });
}
function KeypadScan({ onScan }) {
	const [value, setValue] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 space-y-3",
		onSubmit: (e) => {
			e.preventDefault();
			if (value.trim()) onScan(value.trim());
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "barcode",
				children: "Pack barcode"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "barcode",
				inputMode: "numeric",
				autoComplete: "off",
				placeholder: "e.g. 10041",
				value,
				onChange: (e) => setValue(e.target.value),
				className: "font-mono text-lg tracking-widest"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "lg",
				className: "w-full",
				children: "Check pack"
			})
		]
	});
}
function CameraScan({ onScan }) {
	const videoRef = (0, import_react.useRef)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [live, setLive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let stream = null;
		let raf = 0;
		let detector = null;
		let dead = false;
		async function start() {
			try {
				if (!navigator.mediaDevices?.getUserMedia) {
					setError("Camera is not available in this browser. Use the trolley or keypad.");
					return;
				}
				stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: { ideal: "environment" } },
					audio: false
				});
				if (dead) {
					stream.getTracks().forEach((t) => t.stop());
					return;
				}
				const video = videoRef.current;
				if (!video) return;
				video.srcObject = stream;
				await video.play();
				setLive(true);
				const BD = window.BarcodeDetector;
				if (BD) detector = new BD({ formats: [
					"code_128",
					"ean_13",
					"code_39",
					"qr_code"
				] });
				const tick = async () => {
					if (dead) return;
					if (detector && video.readyState >= 2) try {
						const value = (await detector.detect(video))[0]?.rawValue;
						if (value) {
							onScan(value);
							return;
						}
					} catch {}
					raf = requestAnimationFrame(() => void tick());
				};
				raf = requestAnimationFrame(() => void tick());
			} catch {
				setError("Camera permission was denied or is blocked in this preview. Use the trolley — tap a pack to scan it.");
			}
		}
		start();
		return () => {
			dead = true;
			cancelAnimationFrame(raf);
			stream?.getTracks().forEach((t) => t.stop());
		};
	}, [onScan]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-xl bg-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					className: "h-52 w-full object-cover",
					playsInline: true,
					muted: true
				}),
				live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-8 top-8 h-px bg-primary scan-line" }) : null,
				!live && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute inset-0 flex items-center justify-center text-sm text-paper",
					children: "Opening camera…"
				}) : null
			]
		}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 rounded-md bg-warn-soft px-3 py-2 text-sm text-warn",
			children: error
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "Hold the pack barcode inside the frame. If the camera cannot see it, switch to Trolley."
		})]
	});
}
function WarningOverlay({ result, onAcknowledge, onOverride }) {
	const [muted, setMuted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		startMismatchAlarm();
		if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([
			200,
			80,
			200,
			80,
			400
		]);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			stopAlarm();
			document.body.style.overflow = prev;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (muted) stopAlarm();
		else startMismatchAlarm();
	}, [muted]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "alertdialog",
		"aria-modal": "true",
		"aria-labelledby": "alarm-title",
		className: "alarm-flash fixed inset-0 z-50 flex items-stretch justify-center overflow-y-auto p-3 sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "match-in my-auto flex w-full max-w-2xl flex-col rounded-xl bg-danger-fg p-4 text-fg shadow-2xl sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-danger",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "alarm-ring inline-flex size-14 items-center justify-center rounded-full bg-danger text-danger-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								className: "size-8",
								strokeWidth: 2.4
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-[0.2em] text-danger",
							children: "DOSELOCK · HARD STOP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "alarm-title",
							className: "text-3xl font-semibold tracking-tight text-danger sm:text-5xl",
							children: result.title
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMuted((m) => !m),
						className: "inline-flex size-11 items-center justify-center rounded-md text-danger hover:bg-danger-soft",
						"aria-label": muted ? "Unmute alarm" : "Mute alarm",
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg font-medium leading-snug text-ink sm:text-2xl",
					children: result.headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-fg sm:text-base",
					children: result.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-success-soft p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] tracking-widest text-success uppercase",
								children: "Ordered"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-lg font-semibold text-success-deep",
								children: result.order.displayName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-sm tabular-nums",
								children: [
									result.order.dose,
									" · ",
									result.order.route
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: result.order.prescribedBy
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-danger-soft p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] tracking-widest text-danger uppercase",
								children: "Scanned"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-lg font-semibold text-danger-deep",
								children: result.scanned?.brand ?? "Unknown pack"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm tabular-nums",
								children: result.scanned ? `${result.scanned.strength} · ${result.scanned.form}` : result.detail.slice(0, 48)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xs text-muted",
								children: result.scanned?.barcode ?? "—"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 rounded-md bg-ink px-3 py-2 text-center text-sm font-semibold tracking-wide text-paper uppercase",
					children: "Do not administer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "danger",
						size: "xl",
						className: "flex-1",
						onClick: onAcknowledge,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }), "Acknowledge and hold dose"]
					}), onOverride ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "xl",
						onClick: onOverride,
						children: "Override (logged)"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-center text-xs text-muted",
					children: [
						"Near-miss is written to the incident register for ",
						result.patient.name,
						"."
					]
				})
			]
		})
	});
}
var PENICILLIN = [
	"penicillin",
	"amoxicillin",
	"flucloxacillin",
	"amoxicillin-clavulanate",
	"co-amoxiclav"
];
function norm(s) {
	return s.trim().toLowerCase();
}
function findByBarcode(code) {
	const c = code.trim();
	return medications.find((m) => m.barcode === c);
}
function isPenicillin(med) {
	const g = norm(med.generic);
	const b = norm(med.brand);
	return PENICILLIN.some((p) => g.includes(p) || b.includes(p));
}
function allergyHit(patient, med) {
	for (const raw of patient.allergies) {
		const a = norm(raw);
		if (!a || a.includes("none")) continue;
		if (a.includes("penicillin") && isPenicillin(med)) return "Penicillin";
		if (a.includes("sulfa") && norm(med.generic).includes("sulfa")) return "Sulfa";
		if (norm(med.generic).includes(a) || norm(med.brand).includes(a)) return raw;
	}
	return null;
}
function verifyScan(patient, order, barcode) {
	const scanned = findByBarcode(barcode) ?? null;
	const prescribed = medications.find((m) => m.id === order.medicationId) ?? null;
	const prescribedLabel = `${order.displayName} ${order.dose} ${order.route}`;
	if (!scanned) return {
		kind: "unknown",
		title: "UNRECOGNISED PACK",
		headline: "This barcode is not in the Kingston General formulary.",
		detail: `Scanned code ${barcode} does not match any stocked pack. Do not administer. Return the pack to pharmacy.`,
		scanned: null,
		order,
		patient
	};
	const allergy = allergyHit(patient, scanned);
	if (allergy) return {
		kind: "allergy",
		title: "ALLERGY BLOCK",
		headline: `${patient.name} is allergic to ${allergy}.`,
		detail: `The scanned pack is ${scanned.brand} ${scanned.strength} (${scanned.generic}). This is a ${allergy}-class medicine. Do not administer — even if it matches the written order. Call the prescriber.`,
		scanned,
		order,
		patient
	};
	if (scanned.id === order.medicationId) return {
		kind: "match",
		title: "VERIFIED",
		headline: `Safe to administer ${order.dose} ${order.displayName} ${order.route}.`,
		detail: `Pack ${scanned.brand} ${scanned.strength} matches the order for ${patient.name}.`,
		scanned,
		order,
		patient
	};
	if (norm(scanned.generic) === norm(order.generic)) {
		const orderedStrength = prescribed?.strength ?? order.dose;
		if (scanned.strength !== orderedStrength || scanned.strengthMg !== (prescribed?.strengthMg ?? order.doseMg)) return {
			kind: "wrong-strength",
			title: "WRONG STRENGTH",
			headline: `Order is ${order.dose}. Pack is ${scanned.strength}.`,
			detail: `Same medicine, wrong dose. Prescribed ${prescribedLabel}. Scanned ${scanned.brand} ${scanned.strength}. Do not administer.`,
			scanned,
			order,
			patient
		};
		return {
			kind: "wrong-form",
			title: "WRONG FORM",
			headline: `Order is ${prescribed?.form ?? order.route}. Pack is ${scanned.form}.`,
			detail: `Prescribed ${prescribedLabel}. Scanned ${scanned.brand} ${scanned.strength} ${scanned.form}. Do not administer.`,
			scanned,
			order,
			patient
		};
	}
	const lookalike = prescribed && scanned.lookAlikeOf === prescribed.id ? ` This is a documented look-alike / sound-alike pair with ${prescribed.brand}.` : "";
	return {
		kind: "wrong-drug",
		title: "WRONG MEDICINE",
		headline: `Order is ${order.displayName}. You scanned ${scanned.brand}.`,
		detail: `Prescribed: ${prescribedLabel}. Scanned: ${scanned.brand} ${scanned.strength} ${scanned.form}.${lookalike} Do not administer.`,
		scanned,
		order,
		patient
	};
}
function isAlarm(kind) {
	return kind !== "match";
}
function ScanPage() {
	const { patientId, orderId } = Route.useParams();
	const navigate = useNavigate();
	const patient = patientById(patientId);
	const order = useAppStore((s) => s.orders).find((o) => o.id === orderId);
	const logIncident = useAppStore((s) => s.logIncident);
	const markGiven = useAppStore((s) => s.markGiven);
	const markBlocked = useAppStore((s) => s.markBlocked);
	const [result, setResult] = (0, import_react.useState)(null);
	const lock = (0, import_react.useRef)(false);
	const allergic = (0, import_react.useMemo)(() => patient?.allergies.filter((a) => !a.toLowerCase().includes("none")) ?? [], [patient]);
	const handleScan = (0, import_react.useCallback)((barcode) => {
		if (!patient || !order || lock.current) return;
		lock.current = true;
		playClick();
		const next = verifyScan(patient, order, barcode);
		setResult(next);
		if (isAlarm(next.kind)) {
			logIncident({
				kind: next.kind,
				patientId: patient.id,
				orderId: order.id,
				scannedBarcode: barcode,
				scannedLabel: next.scanned ? `${next.scanned.brand} ${next.scanned.strength}` : barcode,
				prescribedLabel: `${order.displayName} ${order.dose}`,
				detail: next.headline
			});
			markBlocked(order.id);
		}
	}, [
		patient,
		order,
		logIncident,
		markBlocked
	]);
	if (!patient || !order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Order not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/ward",
		className: "text-primary",
		children: "Back to ward"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/patient/$id",
			params: { id: patient.id },
			className: "inline-flex items-center gap-1 text-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), patient.name]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl bg-ink p-5 text-paper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[10px] tracking-[0.2em] text-paper/60 uppercase",
					children: ["Five rights check · ", patient.bed]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-semibold tracking-tight",
					children: patient.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-paper/70",
					children: [
						patient.sex,
						" · ",
						ageFromDob(patient.dob),
						"y · MRN ",
						patient.mrn
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: allergic.length ? allergic.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "blocked",
						children: ["Allergy · ", a]
					}, a)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "paper",
						children: "NKDA"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-lg bg-ink-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-widest text-paper/50 uppercase",
							children: "Administer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xl font-semibold",
							children: [
								order.displayName,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: order.dose
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-paper/70",
							children: [
								order.route,
								" · ",
								order.frequency,
								" · ",
								order.prescribedBy
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-lg font-semibold",
			children: "Scan the pack"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Camera if you have one. Otherwise tap a pack on the trolley — that is the same check."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scanner, {
				order,
				onScan: handleScan
			})
		}),
		result && isAlarm(result.kind) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningOverlay, {
			result,
			onAcknowledge: () => {
				lock.current = false;
				setResult(null);
				navigate({ to: "/incidents" });
			},
			onOverride: () => {
				logIncident({
					kind: "override",
					patientId: patient.id,
					orderId: order.id,
					scannedBarcode: result.scanned?.barcode ?? "",
					scannedLabel: result.scanned ? `${result.scanned.brand} ${result.scanned.strength}` : "unknown",
					prescribedLabel: `${order.displayName} ${order.dose}`,
					detail: "Nurse overrode a hard stop. Dose was not auto-recorded."
				});
				lock.current = false;
				setResult(null);
			}
		}) : null,
		result && result.kind === "match" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchOverlay, {
			result,
			onCancel: () => {
				lock.current = false;
				setResult(null);
			},
			onGive: () => {
				markGiven(order.id);
				logIncident({
					kind: "administered",
					patientId: patient.id,
					orderId: order.id,
					scannedBarcode: result.scanned?.barcode ?? "",
					scannedLabel: result.scanned ? `${result.scanned.brand} ${result.scanned.strength}` : "",
					prescribedLabel: `${order.displayName} ${order.dose}`,
					detail: "Verified match. Dose recorded as given."
				});
				navigate({
					to: "/patient/$id",
					params: { id: patient.id }
				});
			}
		}) : null
	] });
}
//#endregion
export { ScanPage as component };
