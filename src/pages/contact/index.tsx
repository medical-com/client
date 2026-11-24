import { Phone } from "lucide-react";

const Contact = () => (
  <div className="bg-background text-primary">
    <main>
      <section className="mx-auto max-w-360 px-5 pt-20 pb-24 sm:px-[6vw] lg:pt-28 lg:pb-32">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-accent">
            CONTACT · WE’RE HERE TO HELP
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[82px]">
            Let’s get your
            <br />
            <em className="font-normal text-accent">visit scheduled.</em>
          </h1>
          <p className="mt-8 max-w-2xl font-serif text-lg leading-[1.7] text-primary/75 sm:text-[20px]">
            Call our clinic and our team will help you find a convenient time
            for your appointment.
          </p>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-primary text-background">
        <div className="mx-auto max-w-360 px-5 py-14 sm:px-[6vw] sm:py-18">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            CALL TO BOOK
          </p>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            Speak with our team
          </h2>
          <a
            href="tel:+12125550148"
            className="mt-5 inline-flex items-center gap-3 font-serif text-3xl font-bold text-accent transition-colors hover:text-background sm:text-4xl"
            aria-label="Call the demo clinic at +1 212 555 0148"
          >
            <Phone className="size-6" aria-hidden="true" />
            +1 (212) 555-0148
          </a>
          <p className="mt-4 text-sm text-background/60">
            Fictional demo number — calls will not reach a real clinic.
          </p>
        </div>
      </section>
    </main>
  </div>
);

export default Contact;
