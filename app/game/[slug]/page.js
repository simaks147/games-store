import Game from "@/components/Game";
import { API_URL } from "@/const";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = params
  const res = await fetch(`${API_URL}/games/${slug}?key=${process.env.apiKey}`)

  if (!res.ok) notFound()

  const { name } = await res.json()

  return {
    title: name,
    description: name,
  }
}

export default function GamePage() {
  return (
    <Game />
  )
}
