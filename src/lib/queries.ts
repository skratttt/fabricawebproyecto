import { sanityClient } from "./sanity";

// ── Types ─────────────────────────────────────────────────────────────────

export interface Columna {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  mainImage?: { asset: { url: string } };
  body?: any;
}

export interface Estudio {
  _id: string;
  number: string;
  title: string;
  slug: { current: string };
  abstract: string;
  category: string;
  coverImage?: { asset: { url: string } };
  tags?: string[];
  year: string;
  pages: string;
  featured?: boolean;
  pdfUrl?: string;
}

// ── Queries ───────────────────────────────────────────────────────────────

export async function getColumnas(): Promise<Columna[]> {
  return sanityClient.fetch(
    `*[_type == "columna"] | order(publishedAt desc) {
      _id, title, slug, category, excerpt, author, publishedAt, readTime, featured,
      mainImage { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getColumnaBySlug(slug: string): Promise<Columna | null> {
  return sanityClient.fetch(
    `*[_type == "columna" && slug.current == $slug][0] {
      _id, title, slug, category, excerpt, author, publishedAt, readTime, featured,
      mainImage { asset->{ url } },
      body
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getAllEstudios(): Promise<Estudio[]> {
  return sanityClient.fetch(
    `*[_type == "estudio"] | order(publishedAt desc) {
      _id, number, title, slug, abstract, category, coverImage { asset->{ url } }, tags, year, pages, featured,
      "pdfUrl": pdfFile.asset->url
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getFeaturedEstudios(): Promise<Estudio[]> {
  return sanityClient.fetch(
    `*[_type == "estudio" && featured == true] | order(publishedAt desc) {
      _id, number, title, slug, abstract, category, coverImage { asset->{ url } }, tags, year, pages, featured,
      "pdfUrl": pdfFile.asset->url
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getEstudioBySlug(slug: string): Promise<Estudio | null> {
  return sanityClient.fetch(
    `*[_type == "estudio" && slug.current == $slug][0] {
      _id, number, title, slug, abstract, category, coverImage { asset->{ url } }, tags, year, pages, featured,
      "pdfUrl": pdfFile.asset->url
    }`,
    { slug },
    { cache: "no-store", perspective: "published" }
  );
}
