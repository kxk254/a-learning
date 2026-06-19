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
  const [eventAllday, setEventAllday] = useState(false);
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [selectedIDEvent, setSelectedIDEvent] = useState<any | null>(null);
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
        start: new Date(Date.now()),
        end: new Date(Date.now() + 500000),
        allday: false,
        extendedProps: { calendar: "Danger" },
      },
      {
        id: "2",
        title: "Meeting",
        start: new Date(Date.now() + 86400000),
        end: new Date(Date.now() + 86408000),
        allday: false,
        extendedProps: { calendar: "Success" },
      },
      {
        id: "3",
        title: "Workshop",
        start: new Date(Date.now() + 172800000),
        end: new Date(Date.now() + 259200000),
        allday: true,
        extendedProps: { calendar: "Primary" },
      },
    ]);
  }, []);

  const formatDateTimeForInput = (date?: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();

    const start = selectInfo.start;
    const end = selectInfo.end ?? selectInfo.start;

    setEventStartDate(formatDateTimeForInput(start));
    setEventEndDate(formatDateTimeForInput(end));

    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const e = clickInfo.event;
    console.log("handleIDEventClick", e);
    setSelectedEvent(e as unknown as CalendarEvent);
    setSelectedIDEvent(e);
    setEventTitle(e.title);
    setEventStartDate(formatDateTimeForInput(e.start) || "");
    setEventEndDate(formatDateTimeForInput(e.end) || "");
    setEventAllday(e.allDay);
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
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                allDay: eventAllday,
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
        start: eventStartDate,
        end: eventEndDate,
        allDay: eventAllday,
        extendedProps: { calendar: eventLevel },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const deleteModalFields = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    console.log("delete modal fields", id);
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setEventAllday(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    console.log("event start date", eventStartDate);
    console.log("event end date", eventEndDate);
  }, [eventStartDate]);

  useEffect(() => {
    console.log("close-Modal", closeModal);
  }, [closeModal]);

  console.log("date time input", styles.dateTimeInput1);

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
              <label>Full Day</label>
              <input
                type="checkbox"
                id="fullday-checkbox"
                checked={eventAllday}
                onChange={(e) => setEventAllday(e.target.checked)}
              />
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
                  type="datetime-local"
                  value={eventStartDate}
                  className={styles.dateTimeInput1}
                  onChange={(e) => setEventStartDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label>Enter End Date</label>
              <div>
                <input
                  id="event-end-date"
                  type="datetime-local"
                  value={eventEndDate}
                  className={styles.dateTimeInput1}
                  onChange={(e) => setEventEndDate(e.target.value)}
                />
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
            <button
              onClick={() =>
                selectedEvent?.id && deleteModalFields(selectedEvent.id)
              }
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const renderEventContent = (eventInfo: EventContentArg) => {
  console.log(
    "color class",
    eventInfo.event.extendedProps.calendar.toLowerCase(),
  );
  const colorClass =
    styles[eventInfo.event.extendedProps.calendar.toLowerCase()];
  console.log("colorClass==", colorClass);
  return (
    <div className={`${styles.renderEventFirst} ${colorClass} `}>
      <div className={styles.renderEventSecond}></div>
      <div className={styles.renderEventThird}>{eventInfo.timeText}</div>
      <div className={styles.renderEventFourth}>{eventInfo.event.title}</div>
    </div>
  );
};
