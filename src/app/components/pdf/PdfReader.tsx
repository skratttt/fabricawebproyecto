"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => <p role="status" className="p-8 text-center">Preparando lector…</p>,
});

export default function PdfReader({ url, title }: { url: string; title: string }) {
  return <PdfViewer key={url} url={url} title={title} />;
}
