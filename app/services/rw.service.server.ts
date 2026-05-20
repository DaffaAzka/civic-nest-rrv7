import { prisma } from "@/lib/db.server";
import { AppError } from "@/lib/error.server";
import type { Rw } from "@/types/index.types";

export async function create(data: Rw, request: Request) {
  try {
    const result = await prisma.rw.create({
      data,
    });

    return result;
  } catch (error: any) {
    throw new AppError(error ?? "Created failed", 400);
  }
}
