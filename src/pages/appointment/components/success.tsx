import { Button } from "@/components/ui/button";

export const SuccessAppointment = ({
  handleReset,
}: {
  handleReset: () => void;
}) => {
  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto max-w-360 px-5 py-20 sm:px-[6vw] lg:py-28">
        <section className="max-w-3xl">
          <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-accent">
            APPOINTMENT REQUEST · RECEIVED
          </p>

          <h1
            className="
                font-serif text-5xl font-bold
                leading-[0.98]
                tracking-[-0.04em]
                sm:text-6xl
                lg:text-[72px]
              "
          >
            Thank you,
            <br />
            <em className="font-normal text-accent">we&apos;ll be in touch.</em>
          </h1>

          <p
            className="
                mt-8 max-w-2xl
                font-serif text-lg
                leading-[1.7]
                text-primary/70
                sm:text-[19px]
              "
          >
            Your appointment request has been received. Our team will contact
            you shortly to confirm your appointment.
          </p>

          <Button
            type="button"
            size="lg"
            onClick={handleReset}
            className="
                mt-8
                rounded-[5px]
                shadow-[5px_5px_0_var(--color-highlight)]
                transition-all duration-150
                hover:translate-x-0.5
                hover:translate-y-0.5
                hover:shadow-[3px_3px_0_var(--color-highlight)]
              "
          >
            Book another appointment
            <span className="ml-7">→</span>
          </Button>
        </section>
      </main>
    </div>
  );
};
