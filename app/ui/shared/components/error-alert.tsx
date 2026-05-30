import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ErrorAlert({ text }: { text: string }) {
  return (
    <Alert variant="destructive">
      {/* <AlertTitle>Error Message</AlertTitle> */}
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
