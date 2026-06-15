"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/src/components/hooks/useModal";
import { Modal } from "@/src/components/ui/modal/Modal";
import styles from "./Calendar.module.css";

interface CalendarEvent extends EventInput {
  extendedProps: { calendar: string };
}

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Event Conf.",
        start: new Date().toISOString().split("T")[0],
        extendedProps: { calendar: "Danger" },
      },
      {
        id: "2",
        title: "Meeting",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        extendedProps: { calendar: "Success" },
      },
      {
        id: "3",
        title: "Workshop",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
        extendedProps: { calendar: "Primary" },
      },
    ]);
  }, []);

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const e = clickInfo.event;
    setSelectedEvent(e as unknown as CalendarEvent);
    setEventTitle(e.title);
    setEventStartDate(e.start ? formatDateForInput(e.start) : "");
    setEventStartTime(e.start?.toTimeString().slice(0, 5) || "");
    setEventEndDate(e.end ? formatDateForInput(e.end) : "");
    setEventEndTime(e.end?.toTimeString().slice(0, 5) || "");
    setEventLevel(e.extendedProps.calendar);
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update Existing Event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                titl: eventTitle,
                start: start,
                end: end,
                extendedProps: { calendar: eventLevel },
              }
            : event,
        ),
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: start,
        end: end,
        allDay: false,
        extendedProps: { calendar: eventLevel },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
  };

  const start = `${eventStartDate}T${eventStartTime}:00`;
  const end = `${eventEndDate}T${eventEndTime}:00`;

  useEffect(() => {
    console.log("open-Modal", openModal);
  }, [openModal]);

  useEffect(() => {
    console.log("close-Modal", closeModal);
  }, [closeModal]);

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarSection}>
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            multiMonthPlugin,
          ]}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          }}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "multiMonthYear,dayGridMonth,timeGridWeek,listWeek",
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          customButtons={{
            addEventButton: { text: "Add Event +", click: openModal },
          }}
          eventContent={renderEventContent}
        />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className={styles.modal}>
        <div>
          <div>
            <h5>{selectedEvent ? "Edit Event" : "Add Event"}</h5>
            <p>Plan</p>
          </div>
          <div>
            <div>
              <div>
                <label>EventTitle</label>
                <input
                  id="event-title"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label>Event Color</label>
              <div>
                {Object.entries(calendarsEvents).map(([key, value]) => (
                  <div key={key}>
                    <div>
                      <label htmlFor={`modal${key}`}>
                        <span>
                          <input
                            type="radio"
                            name="event-level"
                            value={key}
                            id={`modal${key}`}
                            checked={eventLevel === key}
                            onChange={() => setEventLevel(key)}
                          />
                          <span>
                            <span></span>
                          </span>
                        </span>
                        {key}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label>Enter Start Date</label>
              <div>
                <input
                  id="event-start-date"
                  type="date"
                  value={eventStartDate}
                  onChange={(e) => setEventStartDate(e.target.value)}
                />
                <input id="event-start-time" type="time" />
              </div>
            </div>

            <div>
              <label>Enter End Date</label>
              <div>
                <input
                  id="event-end-date"
                  type="date"
                  value={eventEndDate}
                  onChange={(e) => setEventEndDate(e.target.value)}
                />
                <input id="event-end-time" type="time" />
              </div>
            </div>
          </div>

          <div>
            <button onClick={closeModal} type="button">
              Close
            </button>
            <button onClick={handleAddOrUpdateEvent} type="button">
              {selectedEvent ? "Update Changes" : "Add Event"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const renderEventContent = (eventInfo: EventContentArg) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};
