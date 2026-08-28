import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { newsItems } from "../news-data";

export default function AcontecendoPage() {
  return (
    <main className="news-page">
      <header className="news-page-header">
        <Link className="news-page-back" href="/">
          <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
          Início
        </Link>
        <div>
          <h1>Acontecendo</h1>
          <p>Seleção de novidades publicadas pela Secretaria de Turismo e Cultura.</p>
        </div>
      </header>

      <section className="news-page-grid" aria-label="Todas as notícias">
        {newsItems.map((item) => (
          <article className="news-page-card" key={item.href}>
            <Link className="news-page-card-media" href={`/acontecendo/${item.slug}`}>
              <Image src={item.image} alt="" fill sizes="(max-width: 560px) 92vw, (max-width: 900px) 44vw, 29vw" />
            </Link>
            <div className="news-page-card-copy">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <Link href={`/acontecendo/${item.slug}`}>
                Ler notícia
                <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
