import type { MasterCard } from "@/types/master.types";
import ListingCard from "@/ui/modules/master/listing-card";

const data: MasterCard[] = [
  {
    id: "1",
    title: "Province",
    description: "Master Province",
    href: "/master/province",
  },
  {
    id: "2",
    title: "Regency",
    description: "Master Regency",
    href: "/master/regency",
  },
  {
    id: "3",
    title: "District",
    description: "Master District",
    href: "/master/district",
  },
  {
    id: "4",
    title: "Village",
    description: "Master Village",
    href: "/master/village",
  },
  {
    id: "5",
    title: "RW",
    description: "Master RW",
    href: "/master/rw",
  },
  {
    id: "6",
    title: "RT",
    description: "Master RT",
    href: "/master/rt",
  },
];

export default function MasterPage() {
  return (
    <>
      <ListingCard data={data} />
    </>
  );
}
