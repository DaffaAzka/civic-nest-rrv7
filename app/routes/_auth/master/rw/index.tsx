import type { Route } from "./+types";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
import ModalCreate from "@/ui/modules/master/rw/modal-create";
import type { Rw } from "@/types/rw.types";

export async function loader({ request }: Route.LoaderArgs) {
  const { getProvinces, getRegencies, getDistricts, getVillages } =
    await import("@/services/area.service.server");

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

export async function action({ request }: Route.ActionArgs) {
  const { create } = await import("@/services/rw.service.server");
  const { RwCreateSchema } = await import("@/validators/rw.validator");

  const form = await request.formData();

  const parsed = RwCreateSchema.safeParse({
    provinceCode: form.get("provinceCode"),
    provinceName: form.get("provinceName"),
    regencyCode: form.get("regencyCode"),
    regencyName: form.get("regencyName"),
    districtCode: form.get("districtCode"),
    districtName: form.get("districtName"),
    villageCode: form.get("villageCode"),
    villageName: form.get("villageName"),
    number: form.get("number"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const rw = parsed.data as Rw;
    const data = await create(rw, request);
    return {
      success: true,
      data,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something wrong!";
    return {
      success: false,
      errors: { _form: [message] },
    };
  }
}

export default function RwPage() {
  const { provinces } = useLoaderData<typeof loader>();

  return <ModalCreate provinces={provinces ?? []} />;
}
