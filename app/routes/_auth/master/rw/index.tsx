import type { Route } from "./+types";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
import ModalCreate from "@/features/master/rw/modal-create";
import {
  getDistricts,
  getProvinces,
  getRegencies,
  getVillages,
} from "@/services/area.service.server";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const provinceCode = url.searchParams.get("provinceCode");
  const regencyCode = url.searchParams.get("regencyCode");
  const districtCode = url.searchParams.get("districtCode");

  if (provinceCode) {
    const regencies = await getRegencies(provinceCode);
    return { regencies, provinces: null, villages: null, districts: null };
  }

  if (regencyCode) {
    const districts = await getDistricts(regencyCode);
    return { districts, regencies: null, villages: null, provinces: null };
  }

  if (districtCode) {
    const villages = await getVillages(districtCode);
    return { villages, districts: null, regencies: null, provinces: null };
  }

  const provinces = await getProvinces();

  return { provinces, districts: null, regencies: null, villages: null };
}

export async function action({ request }: Route.ActionArgs) {}

export default function RwPage() {
  const { provinces } = useLoaderData<typeof loader>();

  return <ModalCreate provinces={provinces ?? []} />;
}
