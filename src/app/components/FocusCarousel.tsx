
"use client";

import PeopleCarousel, { type Person } from "./PeopleCarousel";

const focusAreas: Person[] = [
    {
        id: 1,
        name: "Francisco Meneses",
        role: "Economía, innovación e inversiones",
        image: "/assets/francisco meneses.jpeg",
        bio: "Economista de la PUC, MPA/ID de Harvard Kennedy School y PhD en Políticas Públicas de Duke University. Ha sido economista del Banco Central de Chile, investigador del Banco Mundial y la UNESCO, gerente de Financiamiento e Inversión (CIO) de Corfo, y director de Estudios del Ministerio de Educación. Especialista en política fiscal, economía de la educación y movilidad social.",
    },
    {
        id: 2,
        name: "Verónica Pardo",
        role: "Turismo",
        image: "/assets/veronica pardo.jpeg",
        bio: "Ingeniera comercial de la USACH y magíster en Gestión Estratégica de RR.HH. de la PUC. Fue Subsecretaria de Turismo de Chile (2023-2025), Senior Manager en Deloitte Chile liderando el área de Tourism, Hospitality & Leisure para América Latina, y directora asociada en The Canvas Group, donde participó en la estrategia de EcoCamp Patagonia. Con amplia trayectoria en gestión pública y consultoría estratégica en turismo.",
    },
    {
        id: 3,
        name: "Luis Felipe Ramos",
        role: "Energía",
        image: "/assets/luis felipe ramos.jpeg",
        bio: "Abogado de la Universidad de Chile y máster en Derecho Constitucional de la PUCV. Subsecretario de Energía de Chile (2023-2026), expresidente del Partido Liberal (2016-2021) y excoordinador legislativo en el Congreso Nacional. Especialista en derecho administrativo económico, con experiencia en regulación energética y políticas de transición hacia energías renovables.",
    },
    {
        id: 4,
        name: "Ernesto Muñoz",
        role: "Seguridad y justicia",
        image: "/assets/ernesto munoz.jpeg",
        bio: "Abogado de la Universidad de Chile, MBA de la Universidad Alberto Hurtado y máster en Políticas Públicas y Ciencia Política de UC Berkeley. Fue Subsecretario de Justicia (2024-2026), director nacional del Sernac (2014-2018) y director en la Defensoría de la Niñez. Doctorando en Derecho, con trayectoria en protección al consumidor, derechos humanos y modernización de la justicia.",
    },
    {
        id: 5,
        name: "Rodrigo Rettig",
        role: "Agenda legislativa",
        image: "/assets/rodrigo rettig.jpeg",
        bio: "Abogado litigante con sólida formación en derecho penal, compliance y ciencia política. Con más de 15 años de trayectoria profesional, ha conjugado la resolución de conflictos en criminalidad económica y tributaria con la gestión pública y el análisis estratégico. Su mirada cruza el rigor técnico-jurídico con la construcción institucional, aportando una visión cimentada en la filosofía liberal y la responsabilidad civil.",
    },
    {
        id: 7,
        name: "Arantzasu Foppiano",
        role: "Género y agenda mujer",
        image: "/assets/arantzasu-foppiano.jpeg",
        bio: "Abogada con experiencia en asesoría legal y comunicación estratégica. En Fábrica Chile se desempeña como investigadora, aportando desde el análisis y la generación de contenido.",
    },
    {
        id: 8,
        name: "Nicolás Freire",
        role: "Política y coyuntura",
        image: "/assets/nicolas freire.jpeg",
        bio: "Cientista político, máster en Instituciones Parlamentarias y doctor en Estudios Americanos. Con más de 15 años de ejercicio profesional, ha conjugado academia, consultoría y función pública. Panelista estable y frecuente invitado a diversos medios de comunicación, destacando como analista de coyuntura y fenómenos sociopolíticos.",
    },
    {
        id: 9,
        name: "Bartolomé Reus",
        role: "Política y entornos digitales",
        image: "/assets/bartolome reus.jpeg",
    },
    {
        id: 10,
        name: "Loreto González",
        role: "Agenda legislativa",
        image: "/assets/loreto gonzalez.jpeg",
        objectPosition: "top",
    },
];

export default function FocusCarousel() {
    return (
        <PeopleCarousel
            sectionId="focus-areas"
            eyebrow="Áreas"
            title="Voceros y columnistas"
            people={focusAreas}
            theme="dark"
        />
    );
}
