import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Check, b as Ban, c as ShieldAlert, o as Stethoscope, s as Siren, x as ArrowRight, y as Barcode } from "../_libs/lucide-react.mjs";
import { a as useAppStore } from "./router-r1p9Zho0.mjs";
import { n as Wordmark, t as Button } from "./button-CgvJkGh_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C1tDY0s_.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const resetDemo = useAppStore((s) => s.resetDemo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-ink text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { inverted: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ward",
					className: "text-sm font-medium text-paper/80 hover:text-paper",
					children: "Open ward"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.22em] text-primary-soft uppercase",
						children: "Bedside verification · Jamaica"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-4xl font-semibold tracking-tight text-paper sm:text-6xl",
						children: "The last check before the dose."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg",
						children: "Nurses scan the pack. DoseLock matches it to the doctor’s order. A wrong medicine or wrong strength fires a full-screen, full-volume stop — before it reaches the patient."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "paper",
							size: "xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/ward",
								children: ["Open Medical 4B", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "xl",
							className: "border-ink-3 bg-ink-2 text-paper hover:bg-ink-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/scan/$patientId/$orderId",
								params: {
									patientId: "p-devon",
									orderId: "o-devon-morphine"
								},
								onClick: () => resetDemo(),
								children: "Try the hydromorphone trap"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-paper/50",
						children: "Demo hospital: Kingston General Teaching Hospital · fictional patients · Jamaica time"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmPreview, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-bg text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Look-alike pairs",
							v: "Morphine / hydromorphone",
							d: "Same milligram on the ampoule. Seven times the potency. The classic night-shift error."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Wrong strength",
							v: "500 mg vs 850 mg",
							d: "Same name on the blister. DoseLock reads the pack, not the habit."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Allergy catch",
							v: "Even if the order is wrong",
							d: "A penicillin pack against a penicillin-allergic chart still hard-stops."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-bg text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 pb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold tracking-tight sm:text-3xl",
						children: "Three steps at the bedside"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
								n: "01",
								icon: Stethoscope,
								title: "Open the order",
								body: "The nurse works from the live MAR — patient, allergies, dose, route, and the doctor who signed it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
								n: "02",
								icon: Barcode,
								title: "Scan the pack",
								body: "Camera, trolley tap, or keypad. The barcode is the source of truth, not the box colour."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
								n: "03",
								icon: Siren,
								title: "Match or stop",
								body: "A match records the dose. A mismatch fills the screen, sounds a medical alarm, and writes a near-miss."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-ink-3 bg-ink-2 text-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold tracking-tight sm:text-3xl",
							children: "Built to sell into Jamaican wards"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-paper/70",
							children: "Paper MARs, high occupancy, and look-alike stock on the same trolley are a known mix. DoseLock is a phone-first check that a staff nurse can run at the bedside — no cart, no new hardware beyond the camera already in her pocket."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 grid gap-3 sm:grid-cols-2",
							children: [
								"Works on a phone at the bedside",
								"Trolley demo when the camera is blocked",
								"Near-miss register for quality meetings",
								"Doctors can write orders in the same app",
								"Allergy intercept on top of barcode match",
								"Jamaica time, Kingston demo ward, local names"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-primary-soft" }), item]
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "paper",
							size: "lg",
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/ward",
								children: ["Enter the ward demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-ink-3 px-4 py-8 text-center text-xs text-paper/45",
				children: "DoseLock is a demonstration product for hospital evaluation. It is not a certified medical device. Demo data is fictional."
			})
		]
	});
}
function Stat({ k, v, d }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-widest text-muted uppercase",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg font-semibold text-ink",
				children: v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: d
			})
		]
	});
}
function Step({ n, icon: Icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-primary",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-3 size-5 text-ink" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 text-lg font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: body
			})
		]
	});
}
function AlarmPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl bg-danger p-3 shadow-2xl sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg bg-danger-fg p-5 text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-danger",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex size-12 items-center justify-center rounded-full bg-danger text-danger-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.2em] text-danger",
						children: "HARD STOP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold tracking-tight sm:text-3xl",
						children: "WRONG MEDICINE"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base font-medium text-ink",
					children: "Order is Morphine. You scanned Hydromorphone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-success-soft p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] tracking-widest text-success uppercase",
							children: "Ordered"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Morphine 4 mg IV"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-danger-soft p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] tracking-widest text-danger uppercase",
							children: "Scanned"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Hydromorphone 4 mg"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 flex items-center justify-center gap-2 rounded-md bg-ink py-2 text-xs font-semibold tracking-wide text-paper uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5" }), "Do not administer"]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
