import { defineField, defineType } from "sanity";

export const estudio = defineType({
  name: "estudio",
  title: "Estudio / Informe",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Número",
      type: "string",
      description: 'Ej: "001", "002"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Forma parte del enlace público. No lo cambies después de compartir el informe, aunque reemplaces el PDF.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "abstract",
      title: "Abstract / Resumen",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Informe Técnico", value: "Informe Técnico" },
          { title: "Estudio", value: "Estudio" },
          { title: "Doc. de Trabajo", value: "Doc. de Trabajo" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Año",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pages",
      title: "Páginas",
      type: "string",
      description: 'Ej: "84 págs."',
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      description: "Si se activa, este producto aparecerá en la página principal.",
      initialValue: false,
    }),
    defineField({
      name: "pdfFile",
      title: "Archivo PDF",
      description: "Se muestra en el lector de la web. Para corregirlo, reemplaza este archivo y publica sin cambiar el slug.",
      type: "file",
      options: { accept: ".pdf" },
    }),
  ],
  orderings: [
    {
      title: "Número, ascendente",
      name: "numberAsc",
      by: [{ field: "number", direction: "asc" }],
    },
    {
      title: "Fecha de publicación, reciente primero",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", number: "number", year: "year" },
    prepare({ title, number, year }) {
      return { title, subtitle: `#${number} · ${year}` };
    },
  },
});
