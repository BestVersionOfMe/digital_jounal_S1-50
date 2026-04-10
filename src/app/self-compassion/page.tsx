import SelfCompassion from "../../components/self-compassion/SelfCompassion";

/** Standalone route: mirror home — title outside the glass card */
export default function SelfCompassionPage() {
  return (
    <main className="scroll-mt-20 sm:scroll-mt-24">
      <div className="mx-auto max-w-[40rem] px-5 pt-10 pb-0 sm:max-w-[42rem] sm:px-8 sm:pt-12">
        <h1 className="font-display text-center text-[1.25rem] font-semibold tracking-[0.04em] text-bvm-title sm:text-[1.375rem]">
          SELF COMPASSION
        </h1>
      </div>
      <SelfCompassion />
    </main>
  );
}