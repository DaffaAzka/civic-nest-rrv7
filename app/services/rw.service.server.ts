import { prisma } from "@/lib/db.server";
import { AppError } from "@/lib/error.server";
import type { CreateRw, Rw } from "@/types/rw.types";

export async function create(data: CreateRw, request: Request) {
  try {
    const result = await prisma.rw.create({
      data,
    });

    return result;
  } catch (error: any) {
    throw new AppError(error ?? "Created failed", 400);
  }
}

export async function getRws(): Promise<Rw[]> {
  try {
    const rws = await prisma.rw.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return rws;
  } catch (error) {
    console.error("Error fetching rws:", error);
    throw new Error("Failed to fetch rws");
  }
}
