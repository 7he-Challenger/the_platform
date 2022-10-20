import FullCalendar, { EventSourceInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type CalendarProps = {
  events?: any;
};

const Calendar = ({ events }: CalendarProps) => {
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
      eventDataTransform={(e) => {
        return {
          ...e,
          start: e.startDate,
          end: e.endDate,
        }
      }}
      dayMaxEvents={2}
    />
  );
};

export default Calendar;
