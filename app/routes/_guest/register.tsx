import RegisterForm from "@/ui/modules/auth/register-form";
import type { Route } from "./+types/register";
import { register } from "@/services/auth.service.server";
import { data, redirect } from "react-router";
import { RegisterSchema } from "@/validators/auth.validator";
import { AppError } from "@/lib/error.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "An residence app!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();

  const parsed = RegisterSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    password: form.get("password"),
    retry_password: form.get("retry_password"),
  });

  if (!parsed.success) {
    return data(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await register(
      parsed.data.email,
      parsed.data.password,
      parsed.data.name,
      request,
    );

    return redirect("/sign-in");
  } catch (error) {
    const message =
      error instanceof AppError ? error.message : "Something wrong!";

    return data({ errors: { _form: [message] } }, { status: 400 });
  }
}

export default function RegisterPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <RegisterForm />
    </div>
  );
}
