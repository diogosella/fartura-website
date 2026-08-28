import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { newsItems } from "../../news-data";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function findNews(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = findNews(slug);

  if (!news) {
    return {
      title: "Notícia não encontrada",
    };
  }

  return {
    title: `${news.title} | Farturismo`,
    description: news.text,
  };
}

export default async function AcontecendoDetalhePage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = findNews(slug);

  if (!news) {
    notFound();
  }

  return (
    <main className="news-detail-page">
      <header className="news-detail-header">
        <Link className="news-page-back tourism-page-back" href="/acontecendo">
          <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
          Acontecendo
        </Link>

        <div className="news-detail-heading">
          <h1>{news.title}</h1>
          <p>{news.text}</p>
        </div>
      </header>

      <article className="news-detail-layout">
        <div className="news-detail-media">
          <Image src={news.image} alt={`Imagem da notícia ${news.title}`} fill priority sizes="(max-width: 900px) 92vw, 56vw" />
        </div>

        <div className="news-detail-content">
          <section className="news-detail-section" aria-label="Informações da notícia">
            {news.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </section>

          {news.service ? (
            <section className="news-detail-service" aria-labelledby="news-service-title">
              <h2 id="news-service-title">Serviço</h2>
              <ul>
                {news.service.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}
