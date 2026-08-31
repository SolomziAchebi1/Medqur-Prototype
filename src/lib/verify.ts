import { medications } from "./seed";
import type { Medication, Order, Patient, VerifyResult } from "./types";

const PENICILLIN = [
  "penicillin",
  "amoxicillin",
  "flucloxacillin",
  "amoxicillin-clavulanate",
  "co-amoxiclav",
];

function norm(s: string) {
  return s.trim().toLowerCase();
}

export function findByBarcode(code: string): Medication | undefined {
  const c = code.trim();
  return medications.find((m) => m.barcode === c);
}

function isPenicillin(med: Medication) {
  const g = norm(med.generic);
  const b = norm(med.brand);
  return PENICILLIN.some((p) => g.includes(p) || b.includes(p));
}

function allergyHit(patient: Patient, med: Medication): string | null {
  for (const raw of patient.allergies) {
    const a = norm(raw);
    if (!a || a.includes("none")) continue;
    if (a.includes("penicillin") && isPenicillin(med)) return "Penicillin";
    if (a.includes("sulfa") && norm(med.generic).includes("sulfa")) return "Sulfa";
    if (norm(med.generic).includes(a) || norm(med.brand).includes(a)) return raw;
  }
  return null;
}

export function verifyScan(
  patient: Patient,
  order: Order,
  barcode: string,
): VerifyResult {
  const scanned = findByBarcode(barcode) ?? null;
  const prescribed =
    medications.find((m) => m.id === order.medicationId) ?? null;
  const prescribedLabel = `${order.displayName} ${order.dose} ${order.route}`;

  if (!scanned) {
    return {
      kind: "unknown",
      title: "UNRECOGNISED PACK",
      headline: "This barcode is not in the Kingston General formulary.",
      detail: `Scanned code ${barcode} does not match any stocked pack. Do not administer. Return the pack to pharmacy.`,
      scanned: null,
      order,
      patient,
    };
  }

  const allergy = allergyHit(patient, scanned);
  if (allergy) {
    return {
      kind: "allergy",
      title: "ALLERGY BLOCK",
      headline: `${patient.name} is allergic to ${allergy}.`,
      detail: `The scanned pack is ${scanned.brand} ${scanned.strength} (${scanned.generic}). This is a ${allergy}-class medicine. Do not administer — even if it matches the written order. Call the prescriber.`,
      scanned,
      order,
      patient,
    };
  }

  if (scanned.id === order.medicationId) {
    return {
      kind: "match",
      title: "VERIFIED",
      headline: `Safe to administer ${order.dose} ${order.displayName} ${order.route}.`,
      detail: `Pack ${scanned.brand} ${scanned.strength} matches the order for ${patient.name}.`,
      scanned,
      order,
      patient,
    };
  }

  if (norm(scanned.generic) === norm(order.generic)) {
    const orderedStrength = prescribed?.strength ?? order.dose;
    if (scanned.strength !== orderedStrength || scanned.strengthMg !== (prescribed?.strengthMg ?? order.doseMg)) {
      return {
        kind: "wrong-strength",
        title: "WRONG STRENGTH",
        headline: `Order is ${order.dose}. Pack is ${scanned.strength}.`,
        detail: `Same medicine, wrong dose. Prescribed ${prescribedLabel}. Scanned ${scanned.brand} ${scanned.strength}. Do not administer.`,
        scanned,
        order,
        patient,
      };
    }
    return {
      kind: "wrong-form",
      title: "WRONG FORM",
      headline: `Order is ${prescribed?.form ?? order.route}. Pack is ${scanned.form}.`,
      detail: `Prescribed ${prescribedLabel}. Scanned ${scanned.brand} ${scanned.strength} ${scanned.form}. Do not administer.`,
      scanned,
      order,
      patient,
    };
  }

  const lookalike =
    prescribed && scanned.lookAlikeOf === prescribed.id
      ? ` This is a documented look-alike / sound-alike pair with ${prescribed.brand}.`
      : "";

  return {
    kind: "wrong-drug",
    title: "WRONG MEDICINE",
    headline: `Order is ${order.displayName}. You scanned ${scanned.brand}.`,
    detail: `Prescribed: ${prescribedLabel}. Scanned: ${scanned.brand} ${scanned.strength} ${scanned.form}.${lookalike} Do not administer.`,
    scanned,
    order,
    patient,
  };
}

export function isAlarm(kind: VerifyResult["kind"]) {
  return kind !== "match";
}
