import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarPlus, Clock, MapPin } from "lucide-react";
import { eventItems } from "../events-data";
import { eventDateParts, googleCalendarUrl, outlookCalendarUrl } from "../events-utils";

export default function EventosPage() {
  return (
    <main className="events-page">
      <header className="events-page-header">
        <Link className="news-page-back tourism-page-back" href="/">
          <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
          Início
        </Link>

        <div className="events-page-heading">
          <h1>Calendário de eventos</h1>
          <p>Próximos encontros culturais, esportivos e turísticos de Fartura em formato simples para consultar e salvar na agenda.</p>
        </div>
      </header>

      <section className="events-calendar" aria-label="Lista de eventos">
        <div className="events-list">
          {eventItems.map((event) => {
            const date = eventDateParts(event);

            return (
              <article className="event-card" key={event.href}>
                <div className="event-date">
                  <span>{date.month}</span>
                  <strong>{date.day}</strong>
                  <em>{date.weekday}</em>
                </div>

                <Link className="event-media" href={`/eventos/${event.slug}`}>
                  <Image src={event.image} alt="" fill sizes="(max-width: 760px) 92vw, 16rem" />
                </Link>

                <div className="event-copy">
                  <div className="event-meta-row">
                    <span>{event.category}</span>
                    <span>{date.date}</span>
                  </div>

                  <h2>{event.title}</h2>
                  <p>{event.description}</p>

                  <dl className="event-details">
                    <div>
                      <dt>
                        <Clock aria-hidden="true" strokeWidth={1.8} />
                        Horário
                      </dt>
                      <dd>{date.time}</dd>
                    </div>
                    <div>
                      <dt>
                        <MapPin aria-hidden="true" strokeWidth={1.8} />
                        Local
                      </dt>
                      <dd>{event.venue}</dd>
                    </div>
                  </dl>

                  <div className="event-actions" aria-label={`Salvar ${event.title} na agenda`}>
                    <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
                      <CalendarPlus aria-hidden="true" strokeWidth={1.8} />
                      Google Calendar
                    </a>
                    <a href={outlookCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
                      <CalendarPlus aria-hidden="true" strokeWidth={1.8} />
                      Outlook
                    </a>
                    <Link href={`/eventos/${event.slug}`}>
                      Ver evento
                      <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
