import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { request } from "@/lib/api";

const ConfirmDoctorInvitation = () => {
  const [params] = useSearchParams();
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setState("error");
      setMessage("The invitation link is missing its token.");
      return;
    }

    request<{ success: boolean }>("/dashboard/doctor/confirm-invitation", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then(() => setState("success"))
      .catch((error: Error) => {
        setState("error");
        setMessage(error.message);
      });
  }, [params]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-semibold">
          {state === "loading" ? "Confirming invitation..." : state === "success" ? "Invitation confirmed" : "Unable to confirm invitation"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {state === "success" ? "Your doctor account is active and your record has been created." : state === "error" ? message : "Please wait while we activate your account."}
        </p>
        {state !== "loading" && <Link to="/auth/login" className="mt-6 inline-block font-medium underline">Continue to login</Link>}
      </div>
    </section>
  );
};

export default ConfirmDoctorInvitation;
