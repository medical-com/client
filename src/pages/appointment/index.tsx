import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PersonalInformationStep } from "./steps/personal";
import { steps } from "./constants";
import {
  appointmentSchema,
  AppointmentStep,
  type AppointmentFormValues,
} from "./types";
import { getStartOfWeek } from "./utils";
import { ServiceStep } from "./steps/service";
import { DateStep } from "./steps/date";
import { AdditionalStep } from "./steps/additional";
import { SuccessAppointment } from "./components/success";
import { FormNavigation } from "./components/navigation";
import { Progress } from "./components/progress";
import { Header } from "./components/header";

const Appointment = () => {
  const [currentStep, setCurrentStep] = useState<AppointmentStep>(
    AppointmentStep.PersonalInformation,
  );
  const [submitted, setSubmitted] = useState(false);

  const [calendarWeek, setCalendarWeek] = useState(getStartOfWeek(new Date()));

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    mode: "onTouched",

    defaultValues: {
      firstName: "",
      secondName: "",
      address: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      service: "",
      doctor: "",
      date: "",
      time: "",
      additionalInfo: "",
    },
  });

  const fieldsByStep: Record<number, (keyof AppointmentFormValues)[]> = {
    [AppointmentStep.PersonalInformation]: [
      "firstName",
      "secondName",
      "address",
      "dateOfBirth",
      "phone",
      "email",
    ],
    [AppointmentStep.ServiceSelection]: ["service", "doctor"],
    [AppointmentStep.DateSelection]: ["date", "time"],
    [AppointmentStep.AdditionalInformation]: ["additionalInfo"],
  };

  const handleNext = async () => {
    const fields = fieldsByStep[currentStep];

    const isValid = await form.trigger(fields);

    if (!isValid) return;

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    if (currentStep !== AppointmentStep.AdditionalInformation) return;

    console.log("Appointment:", data);

    // Replace this with your API request.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
  };

  const handleReset = () => {
    form.reset();

    setCurrentStep(AppointmentStep.PersonalInformation);

    setCalendarWeek(getStartOfWeek(new Date()));

    setSubmitted(false);
  };

  if (submitted) return <SuccessAppointment handleReset={handleReset} />;

  return (
    <div className="min-h-screen bg-background text-primary">
      <main
        className="
          mx-auto max-w-360
          px-5 py-16
          sm:px-[6vw] sm:py-24
          lg:py-28
        "
      >
        <Header />

        <Progress currentStep={currentStep} setCurrentStep={setCurrentStep} />

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
            mt-10 max-w-5xl
            rounded-[5px]
            border border-primary/10
            bg-background
            p-6
            shadow-[8px_8px_0_var(--color-highlight)]
            sm:p-10
            lg:p-12
          "
        >
          <div className="mb-10 border-b border-primary/10 pb-8">
            <span className="text-xs font-extrabold tracking-[0.2em] text-accent">
              STEP {steps[currentStep].number}
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              {steps[currentStep].title}
            </h2>

            <p className="mt-2 font-serif text-base text-primary/55">
              {steps[currentStep].description}
            </p>
          </div>

          {currentStep === AppointmentStep.PersonalInformation && (
            <PersonalInformationStep form={form} />
          )}
          {currentStep === AppointmentStep.ServiceSelection && (
            <ServiceStep form={form} />
          )}
          {currentStep === AppointmentStep.DateSelection && (
            <DateStep
              form={form}
              calendarWeek={calendarWeek}
              setCalendarWeek={setCalendarWeek}
            />
          )}
          {currentStep === AppointmentStep.AdditionalInformation && (
            <AdditionalStep form={form} />
          )}

          <FormNavigation
            form={form}
            currentStep={currentStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </form>
      </main>
    </div>
  );
};

export default Appointment;
