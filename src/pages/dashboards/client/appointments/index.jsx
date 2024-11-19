import React, { useState } from "react";
import Swal from "sweetalert2";
// import appointmentBg from "../../assets/images/appointmentBg.jpg";

const ClientAppointments = () => {
  const [appointments, setAppointments] = useState([
    // {
    //   id: 1,
    //   date: "November 18, 2024",
    //   time: "10:00 AM",
    //   mode: "Video Call",
    //   status: "Scheduled",
    // },
    {
      id: 2,
      date: "November 25, 2024",
      time: "2:00 PM",
      mode: "In-person",
      status: "Scheduled",
    },
  ]);

  const cancelAppointment = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Cancel Appointment",
      text: "Are you sure you want to cancel this appointment?",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel it",
      cancelButtonText: "No, Keep it",
      buttonsStyling: false,
      customClass: {
        popup: "!rounded-3xl shadow-lg bg-white p-6 py-8",
        confirmButton:
          "!bg-red-500 text-white font-medium py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all",
        cancelButton:
          "!bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
        Swal.fire({
          icon: "success",
          title: "Appointment Cancelled",
          text: "Your appointment has been successfully cancelled.",
          confirmButtonText: "Close",
        });
      }
    });
  };

  const rescheduleAppointment = (id) => {
    Swal.fire({
      title: "Reschedule Appointment",
      html: `
        <label class="block text-left text-gray-700 font-medium mb-1">New Date:</label>
        <input type="date" id="newDate" class="w-full p-3 border rounded-md mb-3 focus:ring-2 focus:ring-blue-400">
        <label class="block text-left text-gray-700 font-medium mb-1">New Time:</label>
        <input type="time" id="newTime" class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400">`,
      showCancelButton: true,
      confirmButtonText: "Reschedule",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "!rounded-3xl shadow-lg bg-white p-6 py-8",
        confirmButton:
          "!bg-blue-500 text-white font-medium py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all",
        cancelButton:
          "!bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newDate = document.getElementById("newDate").value;
        const newTime = document.getElementById("newTime").value;

        if (newDate && newTime) {
          setAppointments((prev) =>
            prev.map((appointment) =>
              appointment.id === id
                ? { ...appointment, date: newDate, time: newTime, status: "Rescheduled" }
                : appointment
            )
          );

          Swal.fire({
            icon: "success",
            title: "Appointment Rescheduled",
            text: `Your appointment has been rescheduled to ${newDate} at ${newTime}.`,
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Please provide both a date and time to reschedule.",
            confirmButtonText: "Close",
          });
        }
      }
    });
  };

  return (
    <div
      className="min-h-[88vh] bg-gradient-to-br from-gray-50 to-blue-100 py-8"
      // style={{ backgroundImage: `url(${appointmentBg})`, backgroundSize: "cover" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary-light mb-8">
          My Appointments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Date: <span className="font-normal">{appointment.date}</span>
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  Time: <span className="font-normal">{appointment.time}</span>
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  Mode: <span className="font-normal">{appointment.mode}</span>
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  Status:{" "}
                  <span
                    className={`font-normal ${
                      appointment.status === "Scheduled" ? "text-green-500" : "text-orange-500"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  className="px-4 py-2   font-medium rounded-full shadow  transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => rescheduleAppointment(appointment.id)}
                  className="px-4 py-2 text-white  bg-primary-main font-medium hover:bg-primary-dark rounded-full shadow  transition"
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientAppointments;
