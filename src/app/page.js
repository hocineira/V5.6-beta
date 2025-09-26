import { redirect } from &apos;next/navigation&apos;

export default function HomePage() {
  // Redirection immédiate côté serveur vers /accueil
  redirect(&apos;/accueil&apos;)
}