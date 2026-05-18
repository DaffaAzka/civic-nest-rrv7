import { useFetcher } from "react-router";
import SelectField from "@/components/custom/select-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Province, Regency, Village } from "@/types/map.types";
import type { SelectItem } from "@/types/other.types";
import { useEffect, useState } from "react";
import InputField from "@/components/custom/input-field";
import LoadingButton from "@/components/custom/loading-button";

export default function ModalCreate({ provinces }: { provinces: Province[] }) {
  const fetcher = useFetcher<{
    regencies: Regency[] | null;
    provinces: Province[] | null;
    districts: Regency[] | null;
    villages: Village[] | null;
  }>();
  const isLoading = fetcher.state === "loading";

  const [values, setValues] = useState<{
    province: string;
    regency: string;
    district: string;
    village: string;
  }>({
    province: "",
    regency: "",
    district: "",
    village: "",
  });

  const [lists, setLists] = useState<{
    regencies: SelectItem[];
    districts: SelectItem[];
    villages: SelectItem[];
  }>({
    regencies: [],
    districts: [],
    villages: [],
  });

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.regencies) {
      setLists({
        regencies: fetcher.data.regencies.map((e) => ({
          id: e.code,
          name: e.name,
        })),
        districts: [],
        villages: [],
      });
    }

    if (fetcher.data.districts) {
      setLists((prev) => ({
        ...prev,
        districts: fetcher.data!.districts!.map((e) => ({
          id: e.code,
          name: e.name,
        })),
        villages: [],
      }));
    }

    if (fetcher.data.villages) {
      setLists((prev) => ({
        ...prev,
        villages: fetcher.data!.villages!.map((e) => ({
          id: e.code,
          name: e.name,
        })),
      }));
    }
  }, [fetcher.data]);

  const selectedProvinces: SelectItem[] = provinces.map((e) => ({
    id: e.code,
    name: e.name,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create RW</Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-xl">
        <DialogHeader>
          <DialogTitle>Create a new RW</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <SelectField
            items={selectedProvinces}
            name="province"
            text="Select Province"
            onChange={(value: string) => {
              setValues({
                province: value,
                regency: "",
                district: "",
                village: "",
              });
              setLists({ regencies: [], districts: [], villages: [] });
              fetcher.load(`?provinceCode=${value}`);
            }}
            value={values.province}
          />

          <SelectField
            items={lists.regencies}
            name="regency"
            text={isLoading ? "Loading..." : "Select Regency"}
            onChange={(value: string, name: string) => {
              setValues((prev) => ({
                ...prev,
                regency: value,
                district: "",
                village: "",
              }));
              setLists((prev) => ({ ...prev, districts: [], villages: [] }));
              fetcher.load(`?regencyCode=${value}`);
            }}
            value={values.regency}
            isDisabled={isLoading || lists.regencies.length === 0}
          />

          <SelectField
            items={lists.districts}
            name="district"
            text={isLoading ? "Loading..." : "Select District"}
            onChange={(value: string) => {
              setValues((prev) => ({ ...prev, district: value, village: "" }));
              setLists((prev) => ({ ...prev, villages: [] }));
              fetcher.load(`?districtCode=${value}`);
            }}
            value={values.district}
            isDisabled={isLoading || lists.districts.length === 0}
          />

          <SelectField
            items={lists.villages}
            name="village"
            text={isLoading ? "Loading..." : "Select Village"}
            onChange={(value: string) => {
              setValues((prev) => ({ ...prev, village: value }));
            }}
            value={values.village}
            isDisabled={isLoading || lists.villages.length === 0}
          />

          <InputField name="rw" placeholder="Rw Number" />

          <LoadingButton text="Submit" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
