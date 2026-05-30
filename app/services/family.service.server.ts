import { prisma } from "@/lib/db.server";
import { AppError } from "@/lib/error.server";

export async function getAll(request: Request) {
  try {
    const result = await prisma.family.findMany();
    return result;
  } catch (error) {
    throw new AppError("Can't connect to server", 400);
  }
}
