import z from "zod";

export const RwCreateSchema = z.object({
  provinceCode: z.string().min(1, "Province code is required."),
  provinceName: z.string().min(1, "Province name is required."),
  regencyCode: z.string().min(1, "Regency code is required."),
  regencyName: z.string().min(1, "Regency name is required."),
  districtCode: z.string().min(1, "District code is required."),
  districtName: z.string().min(1, "District name is required."),
  villageCode: z.string().min(1, "Village code is required."),
  villageName: z.string().min(1, "Village name is required."),
  number: z.string().min(1, "RW number is required."),
});

export type RwCreateInput = z.infer<typeof RwCreateSchema>;
