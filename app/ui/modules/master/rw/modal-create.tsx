import { useFetcher } from "react-router";
import SelectField from "@/ui/shared/components/select-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Province, Regency, Village } from "@/types/map.types";
import type { SelectItem } from "@/types/shared.types";
import { useEffect, useState } from "react";
import InputField from "@/ui/shared/components/input-field";
import LoadingButton from "@/ui/shared/components/loading-button";
import type { action } from "@/routes/_auth/master/rw";

export default function ModalCreate({ provinces }: { provinces: Province[] }) {
  const fetcher = useFetcher<{
    regencies: Regency[] | null;
    provinces: Province[] | null;
    districts: Regency[] | null;
    villages: Village[] | null;
  }>();

  const actionFetcher = useFetcher<typeof action>();

  const isSubmitting = actionFetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";

  const [values, setValues] = useState<{
    provinceCode: string;
    provinceName: string;
    regencyCode: string;
    regencyName: string;
    districtCode: string;
    districtName: string;
    villageCode: string;
    villageName: string;
    number: string;
  }>({
    provinceCode: "",
    provinceName: "",
    regencyCode: "",
    regencyName: "",
    districtCode: "",
    districtName: "",
    villageCode: "",
    villageName: "",
    number: "",
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
        <Button>Create Rw</Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-xl">
        <DialogHeader>
          <DialogTitle>Create a new Rw</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <SelectField
            items={selectedProvinces}
            name="provinceCode"
            text="Select Province"
            onChange={(value: string, name: string) => {
              setValues((prev) => ({
                ...prev,
                provinceCode: value,
                provinceName: name,
                regencyCode: "",
                regencyName: "",
                districtCode: "",
                districtName: "",
                villageCode: "",
                villageName: "",
              }));
              setLists({ regencies: [], districts: [], villages: [] });
              fetcher.load(`?provinceCode=${value}`);
            }}
            value={values.provinceCode}
          />

          <SelectField
            items={lists.regencies}
            name="regencyCode"
            text={isLoading ? "Loading..." : "Select Regency"}
            onChange={(value: string, name: string) => {
              setValues((prev) => ({
                ...prev,
                regencyCode: value,
                regencyName: name,
                districtCode: "",
                districtName: "",
                villageCode: "",
                villageName: "",
              }));
              setLists((prev) => ({ ...prev, districts: [], villages: [] }));
              fetcher.load(`?regencyCode=${value}`);
            }}
            value={values.regencyCode}
            isDisabled={isLoading || lists.regencies.length === 0}
          />

          <SelectField
            items={lists.districts}
            name="districtCode"
            text={isLoading ? "Loading..." : "Select District"}
            onChange={(value: string, name: string) => {
              setValues((prev) => ({
                ...prev,
                districtCode: value,
                districtName: name,
                villageCode: "",
                villageName: "",
              }));
              setLists((prev) => ({ ...prev, villages: [] }));
              fetcher.load(`?districtCode=${value}`);
            }}
            value={values.districtCode}
            isDisabled={isLoading || lists.districts.length === 0}
          />

          <SelectField
            items={lists.villages}
            name="villageCode"
            text={isLoading ? "Loading..." : "Select Village"}
            onChange={(value: string, name: string) => {
              setValues((prev) => ({
                ...prev,
                villageCode: value,
                villageName: name,
              }));
            }}
            value={values.villageCode}
            isDisabled={isLoading || lists.villages.length === 0}
          />

          <InputField
            name="number"
            placeholder="number Number"
            value={values.number}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                number: e.target.value,
              }));
            }}
          />

          <LoadingButton
            text="Submit"
            onClick={() => {
              actionFetcher.submit(
                { ...values, _action: "create" },
                {
                  method: "post",
                },
              );
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
