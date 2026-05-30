import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Civic Nest" },
    { name: "description", content: "An residence app!" },
  ];
}

export default function Home() {
  return <h1>Welcome to Civic Nest</h1>;
}
