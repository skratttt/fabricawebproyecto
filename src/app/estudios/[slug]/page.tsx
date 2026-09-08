import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedPageTitle, AnimatedWord } from "@/app/components/AnimatedTitle";
import { FadeInScroll } from "@/app/components/FadeInScroll";
import { getEstudioBySlug } from "@/lib/queries";

export default async function EstudioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const estudio = await getEstudioBySlug(slug);

    if (!estudio) {
        notFound();
    }

    const getCategoryBgColor = (cat?: string) => {
        switch (cat) {
            case "Informe Técnico":
                return "bg-[#880E4F]";
            case "Estudio":
                return "bg-[#1A2639]";
            case "Doc. de Trabajo":
                return "bg-[#1C3A27]";
            default:
                return "bg-[#D81B60]";
        }
    };

    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-24 flex flex-col">
            <Navbar />

            <article className="max-w-5xl mx-auto px-6 py-12 lg:py-20 flex-1 w-full">
                <div className="mb-10">
                    <Link href="/#studies" className="text-[#D81B60] text-xs tracking-[0.2em] uppercase font-medium hover:underline mb-8 inline-block">
                        ← Volver a Productos
                    </Link>

                    <FadeInScroll>
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className={`${getCategoryBgColor(estudio.category)} text-white text-[10px] px-3 py-1 tracking-[0.2em] uppercase font-bold rounded-sm`}>
                                {estudio.category || "Fábrica"}
                            </span>
                            <span className="text-[#424242]/50 text-[10px] font-medium tracking-[0.2em] uppercase">
                                ESTUDIO #{estudio.number} · {estudio.year}
                            </span>
                        </div>
                    </FadeInScroll>

                    <AnimatedPageTitle
                        className="serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#424242] mb-8 leading-[1.1]"
                        scrollFade={true}
                    >
                        <div className="overflow-hidden flex flex-wrap gap-[0.2em]">
                            {estudio.title.split(" ").map((word: string, i: number) => (
                                <AnimatedWord key={i}>{word}</AnimatedWord>
                            ))}
                        </div>
                    </AnimatedPageTitle>
                    
                    {estudio.tags && estudio.tags.length > 0 && (
                        <FadeInScroll delay={0.2}>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {estudio.tags.map(tag => (
                                    <span key={tag} className="text-xs px-3 py-1 bg-[#424242]/5 text-[#424242]/60 border border-[#424242]/10 tracking-[0.15em] uppercase rounded-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </FadeInScroll>
                    )}
                </div>

                {estudio.coverImage?.asset?.url && (
                    <FadeInScroll delay={0.3}>
                        <div className="relative aspect-[21/9] md:aspect-[3/1] w-full mb-14 overflow-hidden bg-[#424242]/5 rounded-sm shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={estudio.coverImage.asset.url}
                                alt={estudio.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </FadeInScroll>
                )}

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
                     {/* Preview Content */}
                    <div className="lg:col-span-2 text-lg text-[#424242]/80 leading-relaxed space-y-6">
                        <FadeInScroll delay={0.4}>
                            <h3 className="serif text-2xl font-bold text-[#880E4F] mb-6">Resumen / Abstract</h3>
                            <div className="prose prose-lg max-w-none text-[#424242]/80">
                                <p className="whitespace-pre-line text-justify leading-loose">{estudio.abstract}</p>
                            </div>
                        </FadeInScroll>
                    </div>

                    {/* Sidebar / Download */}
                    <div className="lg:col-span-1">
                        <FadeInScroll delay={0.5}>
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-[#424242]/5 lg:sticky lg:top-32">
                                <h3 className="text-xs tracking-[0.2em] uppercase text-[#424242]/40 font-bold mb-6">Detalles del documento</h3>
                                
                                <ul className="space-y-4 text-sm text-[#424242]/70 mb-10">
                                    <li className="flex justify-between border-b border-[#424242]/5 pb-3">
                                        <span className="font-medium text-[#424242]">Categoría</span>
                                        <span className="text-right">{estudio.category || "General"}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-[#424242]/5 pb-3">
                                        <span className="font-medium text-[#424242]">Año</span>
                                        <span className="text-right">{estudio.year}</span>
                                    </li>
                                    {estudio.pages && (
                                        <li className="flex justify-between border-b border-[#424242]/5 pb-3">
                                            <span className="font-medium text-[#424242]">Extensión</span>
                                            <span className="text-right">{estudio.pages}</span>
                                        </li>
                                    )}
                                </ul>

                                {estudio.pdfUrl ? (
                                    <Link
                                        href={`/estudios/${encodeURIComponent(slug)}/leer`}
                                        prefetch={false}
                                        className="flex items-center justify-center gap-3 w-full bg-[#D81B60] text-white px-6 py-4 text-xs tracking-[0.1em] uppercase font-bold hover:bg-[#880E4F] transition-colors rounded-sm shadow-md"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                                        Leer informe
                                    </Link>
                                ) : (
                                    <button
                                        disabled
                                        className="flex items-center justify-center gap-3 w-full bg-[#424242]/5 text-[#424242]/40 px-6 py-4 text-xs tracking-[0.1em] uppercase font-bold cursor-not-allowed rounded-sm"
                                    >
                                        PDF no disponible
                                    </button>
                                )}
                            </div>
                        </FadeInScroll>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
