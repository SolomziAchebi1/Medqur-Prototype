import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Ban,
  Barcode,
  Check,
  ShieldAlert,
  Siren,
  Stethoscope,
} from "lucide-react";
import { Wordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const resetDemo = useAppStore((s) => s.resetDemo);

  return (
    <div className="min-h-dvh bg-ink text-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Wordmark inverted />
        <Link
          to="/ward"
          className="text-sm font-medium text-paper/80 hover:text-paper"
        >
          Open ward
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.22em] text-primary-soft uppercase">
            Bedside verification · Jamaica
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-paper sm:text-6xl">
            The last check before the dose.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            Nurses scan the pack. DoseLock matches it to the doctor’s order. A
            wrong medicine or wrong strength fires a full-screen, full-volume
            stop — before it reaches the patient.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="paper" size="xl">
              <Link to="/ward">
                Open Medical 4B
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-ink-3 bg-ink-2 text-paper hover:bg-ink-3">
              <Link
                to="/scan/$patientId/$orderId"
                params={{ patientId: "p-devon", orderId: "o-devon-morphine" }}
                onClick={() => resetDemo()}
              >
                Try the hydromorphone trap
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-paper/50">
            Demo hospital: Kingston General Teaching Hospital · fictional patients
            · Jamaica time
          </p>
        </div>

        <AlarmPreview />
      </section>

      <section className="bg-bg text-fg">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3">
          <Stat
            k="Look-alike pairs"
            v="Morphine / hydromorphone"
            d="Same milligram on the ampoule. Seven times the potency. The classic night-shift error."
          />
          <Stat
            k="Wrong strength"
            v="500 mg vs 850 mg"
            d="Same name on the blister. DoseLock reads the pack, not the habit."
          />
          <Stat
            k="Allergy catch"
            v="Even if the order is wrong"
            d="A penicillin pack against a penicillin-allergic chart still hard-stops."
          />
        </div>
      </section>

      <section className="bg-bg text-fg">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Three steps at the bedside
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Step
              n="01"
              icon={Stethoscope}
              title="Open the order"
              body="The nurse works from the live MAR — patient, allergies, dose, route, and the doctor who signed it."
            />
            <Step
              n="02"
              icon={Barcode}
              title="Scan the pack"
              body="Camera, trolley tap, or keypad. The barcode is the source of truth, not the box colour."
            />
            <Step
              n="03"
              icon={Siren}
              title="Match or stop"
              body="A match records the dose. A mismatch fills the screen, sounds a medical alarm, and writes a near-miss."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-ink-3 bg-ink-2 text-paper">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built to sell into Jamaican wards
          </h2>
          <p className="mt-3 max-w-2xl text-paper/70">
            Paper MARs, high occupancy, and look-alike stock on the same trolley
            are a known mix. DoseLock is a phone-first check that a staff nurse
            can run at the bedside — no cart, no new hardware beyond the camera
            already in her pocket.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Works on a phone at the bedside",
              "Trolley demo when the camera is blocked",
              "Near-miss register for quality meetings",
              "Doctors can write orders in the same app",
              "Allergy intercept on top of barcode match",
              "Jamaica time, Kingston demo ward, local names",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary-soft" />
                {item}
              </li>
            ))}
          </ul>
          <Button asChild variant="paper" size="lg" className="mt-8">
            <Link to="/ward">
              Enter the ward demo
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-ink-3 px-4 py-8 text-center text-xs text-paper/45">
        DoseLock is a demonstration product for hospital evaluation. It is not a
        certified medical device. Demo data is fictional.
      </footer>
    </div>
  );
}

function Stat({ k, v, d }: { k: string; v: string; d: string }) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[10px] tracking-widest text-muted uppercase">
        {k}
      </p>
      <p className="mt-2 text-lg font-semibold text-ink">{v}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  body,
}: {
  n: string;
  icon: typeof Barcode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="font-mono text-xs text-primary">{n}</p>
      <Icon className="mt-3 size-5 text-ink" />
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function AlarmPreview() {
  return (
    <div className="rounded-xl bg-danger p-3 shadow-2xl sm:p-4">
      <div className="rounded-lg bg-danger-fg p-5 text-fg">
        <div className="flex items-center gap-3 text-danger">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-danger text-danger-fg">
            <Ban className="size-6" />
          </span>
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-danger">
              HARD STOP
            </p>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              WRONG MEDICINE
            </p>
          </div>
        </div>
        <p className="mt-4 text-base font-medium text-ink">
          Order is Morphine. You scanned Hydromorphone.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-success-soft p-3">
            <p className="text-[10px] tracking-widest text-success uppercase">
              Ordered
            </p>
            <p className="font-semibold">Morphine 4 mg IV</p>
          </div>
          <div className="rounded-md bg-danger-soft p-3">
            <p className="text-[10px] tracking-widest text-danger uppercase">
              Scanned
            </p>
            <p className="font-semibold">Hydromorphone 4 mg</p>
          </div>
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 rounded-md bg-ink py-2 text-xs font-semibold tracking-wide text-paper uppercase">
          <ShieldAlert className="size-3.5" />
          Do not administer
        </p>
      </div>
    </div>
  );
}
