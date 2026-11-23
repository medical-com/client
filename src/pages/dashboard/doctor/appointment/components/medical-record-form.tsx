import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { Label } from "@/components/ui/label";
import {
  useCreateAppointmentMedicalRecordMutation,
  useFindAppointmentMedicalRecordQuery,
  useUpdateAppointmentMedicalRecordMutation,
} from "@/pages/dashboard/hooks/appointments";

type MedicalRecordFormProps = {
  appointmentId: string;
  onValidityChange?: (isValid: boolean) => void;
  onPendingChange?: (isPending: boolean) => void;
};

export type MedicalRecordFormHandle = {
  submit: (onSaved?: () => void) => void;
};

export const MedicalRecordForm = forwardRef<
  MedicalRecordFormHandle,
  MedicalRecordFormProps
>(({
  appointmentId,
  onValidityChange,
  onPendingChange,
}: MedicalRecordFormProps, ref) => {
  const recordQuery = useFindAppointmentMedicalRecordQuery(appointmentId);
  const createMutation = useCreateAppointmentMedicalRecordMutation();
  const updateMutation = useUpdateAppointmentMedicalRecordMutation();
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");

  useEffect(() => {
    if (recordQuery.data) {
      setDiagnosis(recordQuery.data.diagnosis);
      setPrescription(recordQuery.data.prescription);
    }
  }, [recordQuery.data]);

  const record = recordQuery.data;
  const isPending = createMutation.isPending || updateMutation.isPending;
  const mutationError = createMutation.error || updateMutation.error;

  useEffect(() => {
    onValidityChange?.(Boolean(diagnosis.trim()));
  }, [diagnosis, onValidityChange]);

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  const submit = (onSaved?: () => void) => {
    if (!diagnosis.trim()) return;

    if (record) {
      updateMutation.mutate({
        id: record.id,
        appointmentId,
        diagnosis: diagnosis.trim(),
        prescription: prescription.trim(),
      }, { onSuccess: onSaved });
    } else {
      createMutation.mutate({
        appointmentId,
        diagnosis: diagnosis.trim(),
        prescription: prescription.trim(),
      }, { onSuccess: onSaved });
    }
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  if (recordQuery.isLoading) {
    return <p className="text-sm text-primary/50">Loading medical record...</p>;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="space-y-6"
    >
      <div className="grid gap-2">
        <Label
          htmlFor="diagnosis"
          className="text-xs font-bold text-primary/60"
        >
          Diagnosis
        </Label>
        <textarea
          id="diagnosis"
          value={diagnosis}
          onChange={(event) => setDiagnosis(event.target.value)}
          required
          maxLength={5000}
          rows={2}
          className="w-full resize-y rounded-[5px] border border-primary/15 bg-transparent px-4 py-4 font-serif text-base leading-7 outline-none transition-colors focus:border-primary"
          placeholder="Enter diagnosis..."
        />
      </div>

      <div className="grid gap-2">
        <Label
          htmlFor="prescription"
          className="text-xs font-bold text-primary/60"
        >
          Prescription
        </Label>
        <textarea
          id="prescription"
          value={prescription}
          onChange={(event) => setPrescription(event.target.value)}
          maxLength={5000}
          rows={2}
          className="w-full resize-y rounded-[5px] border border-primary/15 bg-transparent px-4 py-4 font-serif text-base leading-7 outline-none transition-colors focus:border-primary"
          placeholder="Enter prescription..."
        />
      </div>

      {mutationError && (
        <p className="text-sm text-destructive">
          The medical record could not be saved.
        </p>
      )}

    </form>
  );
});

MedicalRecordForm.displayName = "MedicalRecordForm";
