import ErrorAlert from "@/ui/shared/components/error-alert";
import InputField from "@/ui/shared/components/input-field";
import LoadingButton from "@/ui/shared/components/loading-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Form, redirect, useActionData, useNavigation } from "react-router";

export default function RegisterForm() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const errors = actionData?.errors;

  return (
    <>
      <Card className="min-w-xl">
        <CardHeader>
          <CardTitle>Register Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="flex flex-col gap-4">
            {errors?._form?.[0] && <ErrorAlert text={errors?._form?.[0]} />}

            <InputField name="name" label="Name" error={errors?.name?.[0]} />
            <InputField
              name="email"
              label="Email"
              type="email"
              error={errors?.email?.[0]}
            />
            <div className="flex flex-row gap-4">
              <InputField
                name="password"
                label="Password"
                type="password"
                error={errors?.password?.[0]}
              />
              <InputField
                name="retry_password"
                label="Retry password"
                type="password"
                error={errors?.retry_password?.[0]}
              />
            </div>
            <LoadingButton
              text="Submit"
              loading={navigation.state === "submitting"}
            />
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
