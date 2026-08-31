export type MedForm =
  | "tablet"
  | "capsule"
  | "ampoule"
  | "vial"
  | "infusion"
  | "suspension"
  | "spray"
  | "insulin";

export type OrderStatus = "due" | "overdue" | "given" | "held" | "blocked";

export type VerifyKind =
  | "match"
  | "wrong-drug"
  | "wrong-strength"
  | "wrong-form"
  | "allergy"
  | "unknown";

export type Medication = {
  id: string;
  barcode: string;
  brand: string;
  generic: string;
  strength: string;
  strengthMg: number;
  form: MedForm;
  route: string;
  controlled: boolean;
  lookAlikeOf?: string;
  notes?: string;
};

export type Patient = {
  id: string;
  mrn: string;
  wristband: string;
  name: string;
  sex: "F" | "M";
  dob: string;
  ward: string;
  bed: string;
  allergies: string[];
  diagnosis: string;
  weightKg?: number;
  consultant: string;
};

export type Order = {
  id: string;
  patientId: string;
  medicationId: string;
  generic: string;
  displayName: string;
  dose: string;
  doseMg: number;
  route: string;
  frequency: string;
  dueAt: string;
  status: OrderStatus;
  prescribedBy: string;
  indication?: string;
};

export type Incident = {
  id: string;
  at: string;
  kind: VerifyKind | "override" | "administered";
  patientId: string;
  orderId: string;
  scannedBarcode: string;
  scannedLabel: string;
  prescribedLabel: string;
  detail: string;
  nurse: string;
};

export type Session = {
  nurse: string;
  role: "Staff Nurse" | "Charge Nurse" | "Doctor" | "Pharmacist";
  hospital: string;
  ward: string;
};

export type VerifyResult = {
  kind: VerifyKind;
  title: string;
  headline: string;
  detail: string;
  scanned: Medication | null;
  order: Order;
  patient: Patient;
};
