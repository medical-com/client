const HeroContent = () => {
  return (
    <section className="text-primary">
      <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-accent">
        MODERN MEDICAL CARE · BUILT AROUND YOU
      </p>

      <h1
        className="
          mb-6 font-serif
          text-5xl font-bold leading-[0.98] tracking-[-0.04em]
          sm:text-6xl lg:text-[82px]
        "
      >
        Better care,
        <br />
        <em className="font-normal text-accent">for every stage of life.</em>
      </h1>

      <p
        className="
          font-serif text-lg leading-[1.7]
          text-primary/75
          sm:text-[19px]
        "
      >
        Compassionate medical care, trusted expertise, and personalized
        <br className="hidden sm:block" />
        treatment plans designed around your health and wellbeing.
      </p>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Primary CTA */}
        <button
          type="button"
          className="
            rounded-[5px]
            bg-primary px-5.5 py-4
            font-bold text-background
            shadow-[5px_5px_0_var(--color-highlight)]
            transition-all duration-150
            hover:translate-x-0.5 hover:translate-y-0.5
            hover:shadow-[3px_3px_0_var(--color-highlight)]
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-accent
          "
        >
          Book an appointment
          <span className="ml-8" aria-hidden="true">
            →
          </span>
        </button>

        {/* About button */}
        <a
          href="/about"
          className="
            group rounded-[5px]
            border border-primary/20
            px-5.5 py-4
            font-bold text-primary
            transition-all duration-150
            hover:border-primary
            hover:bg-primary
            hover:text-background
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-accent
          "
        >
          About our clinic
          <span
            className="ml-6 inline-block transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="bg-background">
      <main className="mx-auto max-w-360 px-5 pt-20 pb-32 sm:px-[6vw]">
        <HeroContent />
      </main>
    </div>
  );
};

export default Home;
