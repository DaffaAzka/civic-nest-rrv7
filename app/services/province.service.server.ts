import { prisma } from "@/lib/db.server";
import type { Province } from "@/types/map.types";

export async function getProvinces(): Promise<Province[]> {
  try {
    const provinces = await prisma.province.findMany({
      orderBy: {
        code: "asc",
      },
    });
    return provinces;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw new Error("Failed to fetch provinces");
  }
}
