import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Province } from "@/generated/prisma/client";

export default function TableProvince({provinces}: {provinces: Province[]}) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">No</TableHead>
              <TableHead >Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {provinces.map((province, index) => (
              <TableRow key={province.code}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{province.code}</TableCell>
                <TableCell>{province.name}</TableCell>
                <TableCell className="text-right">
                  <button className="text-blue-500 hover:underline">Edit</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
