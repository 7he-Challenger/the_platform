import FullCalendar, { EventClickArg, EventInput, EventInputTransformer, EventSourceInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type CalendarProps = {
  events?: EventInput[],
  eventDataTransform?: EventInputTransformer,
  eventClick?: ((arg: EventClickArg) => void)
};

const Calendar = ({ 
  events, 
  eventDataTransform,
  eventClick 
}: CalendarProps) => {
  const dataTransform = (e: any) => (e)

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      locale="fr"
      firstDay={1}
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      }}
      businessHours={{
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        startTime: "7:00",
        endTime: "23:00"
      }}
      nowIndicator={true}
      selectable={false}
      selectMirror={true}
      weekNumbers={true}
      weekNumberFormat={{ week: "numeric" }}
      navLinks={true}
      initialView="dayGridMonth"
      events={events}
      eventDataTransform={eventDataTransform || dataTransform}
      eventClick={eventClick}
      dayMaxEvents={2}
    />
  );
};

export default Calendar;
