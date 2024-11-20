import React, { useState } from "react";

const ProfessionalConsultations = () => {
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      consultationType: "Therapy",
      date: "2024-11-18T10:00:00Z",
      status: "Scheduled",
      paymentStatus: "Paid",
      sessionDetails: {
        audioRecording: true,
        chatEnabled: true,
        callEnabled: false,
      },
    },
    {
      id: 2,
      consultationType: "Consultation",
      date: "2024-11-19T15:00:00Z",
      status: "Completed",
      paymentStatus: "Paid",
      sessionDetails: {
        audioRecording: false,
        chatEnabled: true,
        callEnabled: true,
      },
    },
    {
      id: 3,
      consultationType: "Therapy",
      date: "2024-11-20T13:30:00Z",
      status: "Canceled",
      paymentStatus: "Unpaid",
      sessionDetails: {
        audioRecording: true,
        chatEnabled: false,
        callEnabled: true,
      },
    },
  ]);

  const handleAccept = (id) => {
    setConsultations((prev) =>
      prev.map((consultation) =>
        consultation.id === id
          ? { ...consultation, status: "Accepted" }
          : consultation
      )
    );
  };

  const handlePick = (id) => {
    setConsultations((prev) =>
      prev.map((consultation) =>
        consultation.id === id
          ? { ...consultation, status: "Picked" }
          : consultation
      )
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
        All Consultations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="rounded-3xl p-6 bg-white/50 shadow-lg backdrop-blur-lg flex flex-col space-y-4"
          >
            <h2 className="text-xl font-bold text-gray-600">
              {consultation.consultationType}
            </h2>
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span>{" "}
              {new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }).format(new Date(consultation.date))}
            </p>
            <div>
              <h3 className="font-semibold text-gray-700">Session Details:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>
                  Audio Recording:{" "}
                  <span
                    className={`font-medium ${
                      consultation.sessionDetails.audioRecording
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {consultation.sessionDetails.audioRecording ? "Enabled" : "Disabled"}
                  </span>
                </li>
                <li>
                  Chat:{" "}
                  <span
                    className={`font-medium ${
                      consultation.sessionDetails.chatEnabled
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {consultation.sessionDetails.chatEnabled ? "Enabled" : "Disabled"}
                  </span>
                </li>
                <li>
                  Call:{" "}
                  <span
                    className={`font-medium ${
                      consultation.sessionDetails.callEnabled
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {consultation.sessionDetails.callEnabled ? "Enabled" : "Disabled"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              {consultation.status === "Scheduled" && (
                <button
                  onClick={() => handleAccept(consultation.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                >
                  Accept
                </button>
              )}
              {consultation.status === "Accepted" && (
                <button
                  onClick={() => handlePick(consultation.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Pick Consultation
                </button>
              )}
            </div>

            {/* Status Display */}
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-medium ${
                  consultation.status === "Scheduled"
                    ? "text-orange-500"
                    : consultation.status === "Accepted"
                    ? "text-green-500"
                    : consultation.status === "Picked"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
              >
                {consultation.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalConsultations;
