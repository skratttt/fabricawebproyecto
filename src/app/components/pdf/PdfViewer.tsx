"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url,
).toString();

const documentOptions = { cMapUrl: "/pdf-assets/cmaps/", standardFontDataUrl: "/pdf-assets/standard_fonts/", iccUrl: "/pdf-assets/iccs/", wasmUrl: "/pdf-assets/wasm/" };

const buttonClass = "rounded border border-black/15 bg-white px-3 py-2 text-sm hover:bg-pink-50 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-[#D81B60]";

// Keep off-screen page heights without allocating canvases for the entire PDF.
function ContinuousPage({ number, width, ratio, root, error }: {
  number: number; width: number; ratio: number;
  root: RefObject<HTMLDivElement | null>; error: ReactNode;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  useEffect(() => {
    if (!element.current) return;
    const observer = new IntersectionObserver(([entry]) => setNearby(entry.isIntersecting), {
      root: root.current, rootMargin: "1000px 0px",
    });
    observer.observe(element.current);
    return () => observer.disconnect();
  }, [root]);
  return <div ref={element} data-reader-page={number} aria-label={`Página ${number}`}
    className="mx-auto mb-4 bg-white shadow last:mb-0" style={{ width, height: width * ratio }}>
    {nearby ? <Page pageNumber={number} width={width}
      devicePixelRatio={Math.min(window.devicePixelRatio || 1, 2)}
      loading={<p className="p-8 text-center">Cargando página {number}…</p>} error={error} />
      : <p className="p-8 text-center text-sm text-black/50">Página {number}</p>}
  </div>;
}

export default function PdfViewer({ url, title }: { url: string; title: string }) {
  const [ratios, setRatios] = useState<number[]>([]);
  const pages = ratios.length;
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [shareStatus, setShareStatus] = useState("");
  const container = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  function goToPage(value: number) {
    const target = Math.min(pages, Math.max(1, value));
    const scroller = viewport.current;
    const element = scroller?.querySelector<HTMLElement>(`[data-reader-page="${target}"]`);
    if (!scroller || !element) return;
    scroller.scrollTo({ top: scroller.scrollTop + element.getBoundingClientRect().top - scroller.getBoundingClientRect().top, left: 0 });
    setPage(target);
  }

  function updateCurrentPage() {
    const scroller = viewport.current;
    if (!scroller) return;
    const readingLine = scroller.getBoundingClientRect().top + Math.min(100, scroller.clientHeight / 4);
    for (const element of scroller.querySelectorAll<HTMLElement>("[data-reader-page]")) {
      if (element.getBoundingClientRect().bottom > readingLine) {
        setPage(Number(element.dataset.readerPage));
        break;
      }
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin + window.location.pathname);
      setShareStatus("Enlace copiado");
    } catch {
      setShareStatus("Copia el enlace desde la barra de direcciones del navegador.");
    }
  }

  const error = <div role="alert" className="p-8 text-center">
    <p>No pudimos mostrar el PDF. Comprueba tu conexión y vuelve a intentarlo.</p>
    <button className={`${buttonClass} mt-4`} onClick={() => { setRatios([]); setAttempt(value => value + 1); }}>Reintentar</button>
    <a className="ml-4 underline" href={url} target="_blank" rel="noopener noreferrer">Abrir PDF</a>
  </div>;

  return <section aria-label={`Lector: ${title}`} className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 p-3" aria-label="Controles del lector">
      <div className="flex items-center gap-2">
        <button className={buttonClass} disabled={!pages || page <= 1} onClick={() => goToPage(page - 1)} aria-label="Página anterior">←</button>
        <label className="flex items-center gap-2 text-sm">Página
          <select aria-label="Ir a la página" className="rounded border border-black/15 bg-white p-2" value={page} disabled={!pages} onChange={event => goToPage(Number(event.target.value))}>
            {Array.from({ length: pages || 1 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
          </select>
          <span>de {pages || "…"}</span>
        </label>
        <button className={buttonClass} disabled={!pages || page >= pages} onClick={() => goToPage(page + 1)} aria-label="Página siguiente">→</button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className={buttonClass} disabled={zoom <= 0.75} onClick={() => setZoom(value => Math.max(0.75, value - 0.25))} aria-label="Reducir zoom">−</button>
        <span className="min-w-12 text-center text-sm">{Math.round(zoom * 100)}%</span>
        <button className={buttonClass} disabled={zoom >= 2} onClick={() => setZoom(value => Math.min(2, value + 0.25))} aria-label="Ampliar zoom">+</button>
        <button className={buttonClass} onClick={() => setZoom(1)}>Ajustar al ancho</button>
        <button className={buttonClass} onClick={copyLink}>Copiar enlace</button>
        <a className={buttonClass} href={`${url}?descargar=1`} download>Descargar PDF</a>
      </div>
    </div>
    {shareStatus && <p role="status" className="px-4 py-2 text-sm text-[#880E4F]">{shareStatus}</p>}
    <div ref={container}>
      <div ref={viewport} onScroll={updateCurrentPage} tabIndex={0} aria-label="Páginas del informe; desplázate para seguir leyendo" className="max-h-[78dvh] min-h-80 overflow-auto bg-[#e7e5e2] p-2 sm:p-4">
        <Document key={attempt} file={url} options={documentOptions} onLoadSuccess={async (pdf) => {
          const sizes = await Promise.all(Array.from({ length: pdf.numPages }, async (_, index) => {
            try {
              const pdfPage = await pdf.getPage(index + 1);
              const size = pdfPage.getViewport({ scale: 1 });
              return size.height / size.width;
            } catch { return Math.SQRT2; }
          }));
          setRatios(sizes); setPage(1);
        }} loading={<p role="status" className="p-8 text-center">Cargando informe…</p>} error={error} onItemClick={({ pageNumber }) => { if (pageNumber) goToPage(pageNumber); }} externalLinkTarget="_blank" externalLinkRel="noopener noreferrer">
          {!pages && <p role="status" className="p-8 text-center">Preparando páginas…</p>}
          {width > 0 && ratios.map((ratio, index) => <ContinuousPage key={index + 1}
            number={index + 1} ratio={ratio} width={Math.max(240, Math.min(width - 32, 1100)) * zoom}
            root={viewport} error={error} />)}
        </Document>
      </div>
    </div>
    <p aria-live="polite" className="px-4 py-3 text-center text-xs text-black/60">{pages ? `Página ${page} de ${pages}. ` : ""}Desplázate hacia abajo para seguir leyendo. Puedes ampliar el texto con el zoom.</p>
  </section>;
}
