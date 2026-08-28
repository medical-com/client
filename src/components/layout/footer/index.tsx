export const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-background text-primary">
      <div className="mx-auto max-w-360 px-5 py-16 sm:px-[6vw] lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="/"
              className="font-serif text-3xl font-bold tracking-[-0.03em]"
            >
              Medi<span className="text-accent">Care</span>
            </a>

            <p className="mt-5 max-w-sm font-serif text-base leading-7 text-primary/60">
              Thoughtful, modern healthcare built around you. Compassionate
              care, trusted expertise, and a team that listens.
            </p>

            <p className="mt-8 text-xs font-bold tracking-[0.18em] text-primary/40">
              CARE · TRUST · WELLBEING
            </p>
          </div>

          {/* Clinic */}
          <div>
            <h3 className="mb-5 text-xs font-extrabold tracking-[0.2em] text-accent">
              CLINIC
            </h3>

            <nav className="flex flex-col gap-3 font-serif text-sm">
              <a
                href="/about"
                className="w-fit transition-colors hover:text-accent"
              >
                About us
              </a>
              <a
                href="/services"
                className="w-fit transition-colors hover:text-accent"
              >
                Our services
              </a>
              <a
                href="/doctors"
                className="w-fit transition-colors hover:text-accent"
              >
                Our doctors
              </a>
              <a
                href="/contact"
                className="w-fit transition-colors hover:text-accent"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Patient care */}
          <div>
            <h3 className="mb-5 text-xs font-extrabold tracking-[0.2em] text-accent">
              PATIENT CARE
            </h3>

            <nav className="flex flex-col gap-3 font-serif text-sm">
              <a
                href="/appointments"
                className="w-fit transition-colors hover:text-accent"
              >
                Book an appointment
              </a>
              <a
                href="/patient-info"
                className="w-fit transition-colors hover:text-accent"
              >
                Patient information
              </a>
              <a
                href="/faq"
                className="w-fit transition-colors hover:text-accent"
              >
                FAQs
              </a>
              <a
                href="/privacy"
                className="w-fit transition-colors hover:text-accent"
              >
                Privacy policy
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-extrabold tracking-[0.2em] text-accent">
              GET IN TOUCH
            </h3>

            <div className="space-y-3 font-serif text-sm text-primary/70">
              <p>
                123 Wellness Avenue
                <br />
                New York, NY 10001
              </p>

              <a
                href="tel:+12125550148"
                className="block w-fit transition-colors hover:text-accent"
              >
                +1 (212) 555-0148
              </a>

              <a
                href="mailto:hello@medicare.com"
                className="block w-fit transition-colors hover:text-accent"
              >
                hello@medicare.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-5 border-t border-primary/10 pt-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-primary/45">
            © {new Date().getFullYear()} MediCare Clinic. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs font-bold text-primary/50">
            <a href="/privacy" className="transition-colors hover:text-primary">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-primary">
              Terms
            </a>
            <a
              href="/accessibility"
              className="transition-colors hover:text-primary"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
