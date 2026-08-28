import type { EventItem } from "./events-data";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

const longDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

const dayFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  timeZone: "America/Sao_Paulo",
});

const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "short",
  timeZone: "America/Sao_Paulo",
});

const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  timeZone: "America/Sao_Paulo",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

function compactUtcDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(".000", "");
}

export function eventDateParts(event: EventItem) {
  const start = new Date(event.start);
  const end = new Date(event.end);

  return {
    day: dayFormatter.format(start),
    month: monthFormatter.format(start).replace(".", ""),
    weekday: weekdayFormatter.format(start).replace(".", ""),
    date: dateFormatter.format(start).replace(".", ""),
    longDate: longDateFormatter.format(start),
    time: `${timeFormatter.format(start)} às ${timeFormatter.format(end)}`,
  };
}

export function calendarDetails(event: EventItem) {
  return `${event.description}\n\nLocal: ${event.venue}\nOrganização: ${event.organizer}\nMais informações: ${event.href}`;
}

export function googleCalendarUrl(event: EventItem) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${compactUtcDate(event.start)}/${compactUtcDate(event.end)}`,
    details: calendarDetails(event),
    location: event.address,
    ctz: "America/Sao_Paulo",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(event: EventItem) {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: new Date(event.start).toISOString(),
    enddt: new Date(event.end).toISOString(),
    body: calendarDetails(event),
    location: event.address,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}
