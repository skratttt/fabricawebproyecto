import { getEstudioBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const estudio = await getEstudioBySlug(slug);
  if (!estudio?.pdfUrl) return new Response("PDF no disponible", { status: 404 });

  // Only proxy the published file belonging to this project's dataset.
  const assetUrl = new URL(estudio.pdfUrl);
  const prefix = `/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/`;
  if (assetUrl.protocol !== "https:" || assetUrl.hostname !== "cdn.sanity.io" || !assetUrl.pathname.startsWith(prefix)) {
    return new Response("Archivo no válido", { status: 400 });
  }

  // `?descargar=1` serves the same bytes as a download instead of inline reader content.
  const download = new URL(request.url).searchParams.get("descargar") === "1";
  const filename = `${slug.replace(/[^a-z0-9-]/gi, "-").slice(0, 80) || "informe"}.pdf`;

  const headers = new Headers();
  for (const name of ["range", "if-range"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  try {
    const upstream = await fetch(assetUrl, { headers, cache: "no-store", redirect: "error", signal: request.signal });
    if (!upstream.ok && upstream.status !== 416) return new Response("No se pudo cargar el PDF", { status: 502 });
    const responseHeaders = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": download ? `attachment; filename="${filename}"` : "inline",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    for (const name of ["content-length", "content-range", "accept-ranges", "etag", "last-modified"]) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch {
    return new Response("No se pudo cargar el PDF", { status: 502 });
  }
}
