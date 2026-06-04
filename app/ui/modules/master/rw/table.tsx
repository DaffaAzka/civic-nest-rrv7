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
import type { Rw } from "@/types/rw.types";

export default function TableRw({ rws }: { rws: Rw[] }) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">No</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Regency</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Village</TableHead>
              <TableHead>Rw Number</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rws.map((rw, index) => (
              <TableRow key={rw.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{rw.provinceName}</TableCell>
                <TableCell>{rw.regencyName}</TableCell>
                <TableCell>{rw.districtName}</TableCell>
                <TableCell>{rw.villageName}</TableCell>
                <TableCell>{rw.number}</TableCell>
                <TableCell className="text-right">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
