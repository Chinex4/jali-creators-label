import RegisterForm from "../../components/forms/RegisterForm";

export default function BusinessRegister() {
  async function submitToApi(payload: any) {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL || "http://localhost:4000"
      }/api/forms/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error("Failed");
  }
  return (
    <RegisterForm
      kind="business"
      titleBadge="Register as a Brand 💼"
      onSubmitApi={submitToApi}
    />
  );
}
