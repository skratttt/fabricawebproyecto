"use client";

import { FadeInScroll } from "./FadeInScroll";

interface BoardMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Empty placeholders to be filled later
const boardMembers: BoardMember[] = [
  {
    id: 1,
    name: "Andrea Bentancor",
    role: "Próximamente",
    image: "/assets/andrea betancor.jpeg",
  },
  {
    id: 2,
    name: "Nicolás Freire",
    role: "Director Ejecutivo",
    image: "/assets/nicolas freire.jpeg",
  },
  {
    id: 3,
    name: "Juan Carlos Urzúa",
    role: "Presidente del directorio",
    image: "/assets/juan carlos urzua.jpeg",
  },
  {
    id: 4,
    name: "Próximamente",
    role: "Próximamente",
    image: "",
  },
  {
    id: 5,
    name: "Próximamente",
    role: "Próximamente",
    image: "",
  },
  {
    id: 6,
    name: "Juan Carlos García",
    role: "Próximamente",
    image: "/assets/juan carlos garcia.jpeg",
  },
  {
    id: 7,
    name: "Francisco Meneses",
    role: "Próximamente",
    image: "/assets/francisco meneses.jpeg",
  },
];

export default function BoardCarousel() {
  return (
    <section
      id="board"
      className="bg-[#F5F5F5] py-24 px-6 border-t border-[#424242]/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <FadeInScroll>
            <div>
              <p className="text-[#D81B60] text-xs tracking-[0.3em] uppercase font-medium mb-2">
                Directorio
              </p>
              <h2 className="serif text-4xl font-bold text-[#424242]">
                Equipo Directivo
              </h2>
            </div>
          </FadeInScroll>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {boardMembers.map((member, i) => (
            <FadeInScroll key={member.id} delay={i * 0.1} className="group">
              <div className="w-full aspect-square mb-5 overflow-hidden bg-[#424242]/5 border border-[#424242]/10">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center grayscale transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#424242]/30 text-xs tracking-[0.2em] uppercase">
                    Próximamente
                  </div>
                )}
              </div>
              <h3 className="serif text-lg font-bold text-[#424242] leading-tight">
                {member.name}
              </h3>
              <p className="text-[#D81B60] text-xs tracking-[0.2em] uppercase mt-1">
                {member.role}
              </p>
            </FadeInScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
