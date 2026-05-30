import { SignInSchema } from "@/validators/auth.validator";
import type { Route } from "./+types/sign-in";
import { data, redirect } from "react-router";
import { AppError } from "@/lib/error.server";
import { signIn } from "@/services/auth.service.server";
import SignInForm from "@/ui/modules/auth/login-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In" },
    { name: "description", content: "An residence app!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();

  const parsed = SignInSchema.safeParse({
    email: form.get("email"),
    password: form.get("password"),
  });

  if (!parsed.success) {
    return data(
      {
        errors: parsed.error.flatten().fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const response = await signIn(
      parsed.data.email,
      parsed.data.password,
      request,
    );
    const sessionCookie = response.headers.get("set-cookie");
    return redirect("/dashboard", {
      headers: sessionCookie ? { "Set-Cookie": sessionCookie } : undefined,
    });
  } catch (error) {
    const message =
      error instanceof AppError ? error.message : "Something wrong!";
    return data({ errors: { _form: [message] } }, { status: 400 });
  }
}

export default function SignInPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignInForm />
    </div>
  );
}
