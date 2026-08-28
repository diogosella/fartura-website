import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarPlus, Clock, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { eventItems } from "../../events-data";
import { eventDateParts, googleCalendarUrl, outlookCalendarUrl } from "../../events-utils";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

function findEvent(slug: string) {
  return eventItems.find((event) => event.slug === slug);
}

export function generateStaticParams() {
  return eventItems.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = findEvent(slug);

  if (!event) {
    return {
      title: "Evento não encontrado",
    };
  }

  return {
    title: `${event.title} | Farturismo`,
    description: event.description,
  };
}

export default async function EventoDetalhePage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = findEvent(slug);

  if (!event) {
    notFound();
  }

  const date = eventDateParts(event);

  return (
    <main className="event-detail-page">
      <header className="event-detail-header">
        <Link className="news-page-back tourism-page-back" href="/eventos">
          <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
          Eventos
        </Link>

        <div className="event-detail-heading">
          <h1>{event.title}</h1>
          <p>{event.description}</p>
        </div>
      </header>

      <article className="event-detail-layout">
        <div className="event-detail-top">
          <div className="event-detail-media">
            <Image src={event.image} alt={`Arte do evento ${event.title}`} fill priority sizes="(max-width: 900px) 92vw, 36vw" />
          </div>

          <aside className="event-detail-summary" aria-label="Resumo do evento">
            <dl>
              <div>
                <dt>
                  <Clock aria-hidden="true" strokeWidth={1.8} />
                  Data e horário
                </dt>
                <dd>
                  {date.longDate}
                  <br />
                  {date.time}
                </dd>
              </div>
              <div>
                <dt>
                  <MapPin aria-hidden="true" strokeWidth={1.8} />
                  Local
                </dt>
                <dd>{event.venue}</dd>
              </div>
              <div>
                <dt>
                  <UserRound aria-hidden="true" strokeWidth={1.8} />
                  Organização
                </dt>
                <dd>{event.organizer}</dd>
              </div>
              {event.organizerPhone || event.organizerEmail ? (
                <div className="event-detail-contact-row">
                  {event.organizerPhone ? (
                    <div>
                      <dt>
                        <Phone aria-hidden="true" strokeWidth={1.8} />
                        Telefone
                      </dt>
                      <dd>{event.organizerPhone}</dd>
                    </div>
                  ) : null}
                  {event.organizerEmail ? (
                    <div>
                      <dt>
                        <Mail aria-hidden="true" strokeWidth={1.8} />
                        E-mail
                      </dt>
                      <dd>{event.organizerEmail}</dd>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </dl>
          </aside>
        </div>

        <div className="event-detail-main">
          <section className="event-detail-section" aria-labelledby="event-details-title">
            <h2 id="event-details-title">Informações do evento</h2>
            {event.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </section>

          <section className="event-detail-section" aria-labelledby="event-schedule-title">
            <h2 id="event-schedule-title">Programação</h2>
            <ul>
              {event.schedule.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div className="event-detail-actions" aria-label={`Salvar ${event.title} na agenda`}>
            <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
              <CalendarPlus aria-hidden="true" strokeWidth={1.8} />
              Google Calendar
            </a>
            <a href={outlookCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
              <CalendarPlus aria-hidden="true" strokeWidth={1.8} />
              Outlook
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
