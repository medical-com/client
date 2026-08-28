const About = () => {
  return (
    <div className="bg-background text-primary">
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-360 px-5 pt-20 pb-24 sm:px-[6vw] lg:pt-28 lg:pb-32">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-accent">
              ABOUT OUR CLINIC · CARE WITH PURPOSE
            </p>

            <h1
              className="
                font-serif text-5xl font-bold leading-[0.98]
                tracking-[-0.04em]
                sm:text-6xl lg:text-[82px]
              "
            >
              Healthcare that feels
              <br />
              <em className="font-normal text-accent">personal.</em>
            </h1>

            <p
              className="
                mt-8 max-w-2xl font-serif text-lg leading-[1.7]
                text-primary/75 sm:text-[20px]
              "
            >
              We believe great healthcare starts with listening. Our clinic
              combines modern medicine with genuine human connection to give
              every patient thoughtful, personalized care.
            </p>
          </div>
        </section>

        {/* Intro / Story */}
        <section className="border-y border-primary/10">
          <div className="mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-[6vw] lg:grid-cols-2 lg:gap-24 lg:py-28">
            <div>
              <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
                OUR STORY
              </p>

              <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
                Medicine should be
                <br />
                <em className="font-normal">human first.</em>
              </h2>
            </div>

            <div className="space-y-6 font-serif text-lg leading-[1.75] text-primary/70">
              <p>
                Our clinic was created with a simple idea: healthcare should
                never feel rushed, impersonal, or complicated.
              </p>

              <p>
                From your first consultation to ongoing treatment, we take the
                time to understand your concerns, explain your options, and
                create a care plan that fits your life.
              </p>

              <p>
                Our experienced team brings together clinical expertise, modern
                technology, and a warm approach to make every visit feel a
                little easier.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-360 px-5 py-20 sm:px-[6vw] lg:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
              WHAT WE BELIEVE
            </p>

            <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
              Care built on
              <br />
              <em className="font-normal text-accent">trust.</em>
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[5px] bg-primary/10 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Listen first",
                text: "Every patient has a different story. We listen carefully before recommending a path forward.",
              },
              {
                number: "02",
                title: "Treat thoughtfully",
                text: "We combine proven medical knowledge with a personalized approach to every treatment.",
              },
              {
                number: "03",
                title: "Stay with you",
                text: "Good healthcare is ongoing. We are here to support you beyond a single appointment.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="bg-background p-8 sm:p-10 lg:p-12"
              >
                <span className="text-xs font-extrabold tracking-[0.2em] text-accent">
                  {item.number}
                </span>

                <h3 className="mt-12 font-serif text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 font-serif text-base leading-7 text-primary/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Team / Philosophy */}
        <section className="bg-primary text-background">
          <div className="mx-auto grid max-w-360 gap-12 px-5 py-20 sm:px-[6vw] lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:py-28">
            <div>
              <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-accent">
                OUR APPROACH
              </p>

              <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
                Expertise you can
                <br />
                <em className="font-normal">feel confident in.</em>
              </h2>
            </div>

            <div className="space-y-8">
              <p className="max-w-2xl font-serif text-xl leading-[1.7] text-background/75">
                Our doctors and healthcare professionals are committed to
                delivering excellent clinical care while making sure you feel
                heard, informed, and comfortable throughout your journey.
              </p>

              <div className="grid gap-8 border-t border-background/15 pt-8 sm:grid-cols-3">
                <div>
                  <strong className="font-serif text-3xl">15+</strong>
                  <p className="mt-2 text-sm text-background/55">
                    Years of experience
                  </p>
                </div>

                <div>
                  <strong className="font-serif text-3xl">20k+</strong>
                  <p className="mt-2 text-sm text-background/55">
                    Patients cared for
                  </p>
                </div>

                <div>
                  <strong className="font-serif text-3xl">4.9/5</strong>
                  <p className="mt-2 text-sm text-background/55">
                    Patient satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-360 px-5 py-24 text-center sm:px-[6vw] lg:py-32">
          <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-accent">
            YOUR HEALTH MATTERS
          </p>

          <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Ready to put your health
            <br />
            <em className="font-normal text-accent">first?</em>
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-serif text-lg leading-8 text-primary/65">
            Take the first step toward better, more personal healthcare. Our
            team is ready to help.
          </p>

          <button
            type="button"
            className="
              mt-8 rounded-[5px]
              bg-primary px-6 py-4
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
        </section>
      </main>
    </div>
  );
};

export default About;
