import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function LoadingButton({
  text,
  loading = false,
  onClick,
}: {
  text: string;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button onClick={onClick} disabled={loading} className="w-full flex gap-2">
      {loading ?
        <Spinner />
      : <></>}
      {text}
    </Button>
  );
}
