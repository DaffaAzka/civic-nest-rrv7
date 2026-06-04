import TableProvince from "@/ui/modules/master/province/table";
import { Route, useLoaderData } from "react-router";

export async function loader() {
  const { getProvinces } = await import("@/services/province.service.server");
  const provinces = await getProvinces();

  return { provinces };
}

export default function ProvincePage() {
  const { provinces } = useLoaderData<typeof loader>();
  return (
    <>
      <TableProvince provinces={provinces} />
    </>
  );
}
