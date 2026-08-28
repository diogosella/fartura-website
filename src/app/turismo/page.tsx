import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { tourismItems } from "../turismo-data";

export default function TurismoPage() {
  return (
    <main className="tourism-page">
      <header className="tourism-page-header">
        <Link className="news-page-back tourism-page-back" href="/">
          <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
          Início
        </Link>
        <div>
          <h1>Notícias e experiências turísticas</h1>
          <p>
            Eventos, roteiros e atrativos publicados pelo portal Descubra Fartura,
            reunidos em uma leitura simples e organizada.
          </p>
        </div>
      </header>

      <section className="tourism-list" aria-label="Notícias de turismo">
        {tourismItems.map((item) => (
          <article className="tourism-card" key={item.href}>
            <div className="tourism-card-media">
              <Image src={item.image} alt="" fill sizes="(max-width: 900px) 92vw, 44vw" />
            </div>
            <div className="tourism-card-copy">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
