import React, { useState, useEffect } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event as BigCalendarEvent,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { format, parse, startOfWeek, getDay, addHours } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { loadAppointments } from "@/redux/appointmentsSlice";
import { RootState } from "@/redux/store";
import CustomModal from "./CustomModal";
interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

const Calender: React.FC = () => {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector(
    (state: RootState) => state.appointments
  );

  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadAppointments());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const events = appointments.map((appointment: any) => ({
    title: appointment.name,
    start: new Date(appointment.date + "T" + appointment.time),
    end: addHours(new Date(appointment.date + "T" + appointment.time), 1),
    id: appointment.id,
  }));

  const handleEventClick = (event: BigCalendarEvent) => {
    setSelectedEvent(event as Appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DnDCalendar
        defaultView="month"
        events={events}
        localizer={localizer}
        onSelectEvent={handleEventClick}
        resizable
        style={{ height: "80vh" }}
      />
      {selectedEvent && (
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
          <p>
            <strong>Title:</strong> {selectedEvent.title}
          </p>
          <p>
            <strong>Start:</strong>{" "}
            {format(new Date(selectedEvent.start), "MMMM dd, yyyy hh:mm a")}
          </p>
          <p>
            <strong>End:</strong>{" "}
            {format(new Date(selectedEvent.end), "MMMM dd, yyyy hh:mm a")}
          </p>
        </CustomModal>
      )}
    </>
  );
};

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

export default Calender;
