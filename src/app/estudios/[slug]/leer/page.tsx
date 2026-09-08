import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEstudioBySlug } from "@/lib/queries";
import PdfReader from "@/app/components/pdf/PdfReader";

// Always resolve the currently published asset, including after a PDF replacement.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const estudio = await getEstudioBySlug(slug);
  return { title: estudio ? `${estudio.title} | Fábrica Chile` : "Informe no disponible | Fábrica Chile" };
}

export default async function LeerEstudioPage({ params }: Props) {
  const { slug } = await params;
  const estudio = await getEstudioBySlug(slug);
  if (!estudio) notFound();

  return <main lang="es" className="min-h-screen bg-[#FAF9F6] px-3 py-6 text-[#424242] sm:px-6">
    <div className="mx-auto max-w-7xl">
      <header className="mb-5">
        <Link href={`/estudios/${encodeURIComponent(slug)}`} className="text-sm text-[#D81B60] hover:underline">← Volver al estudio</Link>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#880E4F]">Fábrica Chile · Lectura en línea</p>
        <h1 className="serif mt-2 text-2xl font-bold sm:text-3xl">{estudio.title}</h1>
      </header>
      {estudio.pdfUrl ? <PdfReader key={estudio.pdfUrl} url={`/api/estudios/${encodeURIComponent(slug)}/pdf`} title={estudio.title} /> : <div className="rounded-lg border border-black/10 bg-white p-8"><h2 className="text-xl font-semibold">PDF no disponible</h2><p className="mt-2">El informe todavía no tiene un archivo publicado. Vuelve a consultar este mismo enlace más adelante.</p></div>}
    </div>
  </main>;
}
