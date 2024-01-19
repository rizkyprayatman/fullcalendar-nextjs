/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";

const Fullcalendar = () => {
  const router = useRouter();
  const calendarRef = React.useRef(null);
  const [events, setEvents] = useState([]);
  const [titleEvent, setTitleEvent] = useState("");
  const [redDates, setRedDates] = useState([
    {
      title: "After Event",
      date: "2024-01-23T17:00:00.000Z",
      color: "orange",
    },
  ]);
  const preEventDays = 2;
  const eventDays = 2;
  const afterEventDays = 4;

  const handleSweetAlert = async (arg) => {
    const selectedDate = new Date(arg.date);
    const checkRedClick = new Date(arg.date);

    const isRedDate = redDates.findIndex(
      (event) =>
        new Date(event.date).getTime() ===
        checkRedClick.setDate(checkRedClick.getDate() + 1)
    );

    if (isRedDate !== -1) {
      Swal.fire({
        title: "Date Event?",
        text: "Yahh Kamu tidak dapat memilih tanggal ini ?",
        icon: "warning",
      });
      return;
    }

    const existingEventIndex = events.findIndex(
      (event) => new Date(event.date).getTime() === selectedDate.getTime()
    );

    if (existingEventIndex !== -1) {
      const updatedEvents = events.filter(
        (event, index) => index !== existingEventIndex
      );
      setEvents(updatedEvents);
      return;
    }

    const { value: title } = await Swal.fire({
      title: "Event Apa Nih ?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "submit",
      showLoaderOnConfirm: true,
      preConfirm: (title) => {
        setTitleEvent(title);
      },
    });

    if (title) {
      handleDateClick(arg, title);
    }
  };

  const handleDateClick = (arg, title) => {
    const selectedDate = new Date(arg.date);

    const preEventStart = new Date(selectedDate);
    preEventStart.setDate(selectedDate.getDate() - preEventDays);

    const eventStart = new Date(selectedDate);
    const eventEnd = new Date(selectedDate);
    eventEnd.setDate(selectedDate.getDate() + eventDays);

    const afterEventEnd = new Date(selectedDate);
    afterEventEnd.setDate(selectedDate.getDate() + afterEventDays);

    const preEventRange = getDatesRange(preEventStart, selectedDate);
    const eventRange = getDatesRange(eventStart, eventEnd);
    const afterEventRange = getDatesRange(eventEnd, afterEventEnd);

    const selectedDates = [...preEventRange, ...eventRange, ...afterEventRange];

    const isOverlap = selectedDates.some((date) =>
      events.some(
        (event) => new Date(event.date).getTime() === new Date(date).getTime()
      )
    );

    if (isOverlap) {
      Swal.fire({
        title: "Date Event?",
        text: "Tanggal yang kamu pilih bertabrakan dengan event sebelumnya, Pilih tanggal lain ya?",
        icon: "warning",
      });

      return;
    }

    const preEvent = preEventRange.map((date) => ({
      title: `Pre Event ${title}`,
      date: date,
      color: "yellow",
    }));
    const event = eventRange.map((date) => ({
      title: `Event ${title}`,
      date: date,
      color: "green",
    }));
    const afterEvent = afterEventRange.map((date) => ({
      title: `After Event ${title}`,
      date: date,
      color: "orange",
    }));

    const updatedEvents = [...events, ...preEvent, ...event, ...afterEvent];

    // Save the updated events array to localStorage
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Update state or wherever you are storing the events in your component
    setEvents(updatedEvents);
  };

  const renderRedDate = (redDates) => {
    if (typeof document !== "undefined") {
      redDates.forEach((dateInfo) => {
        const dayEl = document.querySelector(
          `.fc-day[data-date="${dateInfo.date.split("T")[0]}"]`
        );

        if (dayEl) {
          dayEl.classList.add(
            "bg-red-500",
            "pointer-events-none",
            "cursor-not-allowed"
          );
        }
      });
    }
  };

  const getDatesRange = (startDate, endDate) => {
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate < endDate) {
      days.push(new Date(currentDate).toISOString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  useEffect(() => {
    const storageEvents = localStorage.getItem("events");

    if(storageEvents){
      const parsedEvents = JSON.parse(storageEvents);
      setEvents(parsedEvents);
    }
    renderRedDate(redDates);
  }, [renderRedDate(redDates)]);

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        timeZone="local"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleSweetAlert}
        events={events}
      />
    </>
  );
};

export default Fullcalendar;
