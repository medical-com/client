export const Header = () => {
  return (
    <div className="max-w-3xl">
      <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-accent">
        APPOINTMENTS · WE ARE HERE FOR YOU
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
        Book your
        <br />
        <em className="font-normal text-accent">appointment.</em>
      </h1>

      <p
        className="
                      mt-7 max-w-2xl
                      font-serif text-lg
                      leading-[1.7]
                      text-primary/70
                      sm:text-[19px]
                    "
      >
        A few details and we&apos;ll help arrange the right care for you.
      </p>
    </div>
  );
};
