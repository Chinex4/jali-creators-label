import RegisterForm from "../../components/forms/RegisterForm";

class ApiError extends Error {
  status?: number;
  errors?: any;
}

export default function BusinessRegister() {
  async function submitToApi(payload: any) {
    const base =
      import.meta.env.VITE_API_URL || "https://api.jalicreatorslabel.com";
    const res = await fetch(`${base}/api/forms/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Bubble up Laravel’s message + errors map
      const err = new ApiError(data?.message || "Validation failed");
      err.status = res.status;
      err.errors = data?.errors || null;
      throw err;
    }

    return { ok: true, message: data?.message };
  }

  return (
    <RegisterForm
      kind="business"
      titleBadge="Register as a Brand"
      onSubmitApi={submitToApi}
    />
  );
}
