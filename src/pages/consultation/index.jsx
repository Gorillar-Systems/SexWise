import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // DatePicker CSS
import { apiBookConsultation } from "../../services/consultation";
import consultationBg from "../../assets/images/consultationBg.jpg";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Consultation = () => {
  const [consultationType, setConsultationType] = useState("consultation");
  const [date, setDate] = useState(new Date());
  const [audioRecording, setAudioRecording] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [callEnabled, setCallEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const consultationData = {
      userId: user?._id,
      consultationType,
      date,
      sessionDetails: { audioRecording, chatEnabled, callEnabled },
    };

    console.log("date-->", date);

    try {
      setLoading(true);
      Swal.fire({
        icon: "question",
        title: "Confirm Booking",
        text: "Are you sure you want to book this consultation?",
        showCancelButton: true,
        confirmButtonText: "Yes, Book it",
        cancelButtonText: "Cancel",
        buttonsStyling: false,
        customClass: {
          popup: "!rounded-3xl shadow-lg bg-white p-6 py-8",
          title: "text-lg font-bold text-blue-600",
          text: "text-gray-700",
          confirmButton:
            "!bg-green-500 mr-4 text-white font-medium py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all",
          cancelButton:
            "!bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all",
        },
      }).then(async(result) => {
        if (result.isConfirmed) {
          console.log(consultationData);
      const response = await apiBookConsultation(consultationData);
          
          Swal.fire({
            icon: "success",
            title: `Consultation Booked Successfully for ${new Intl.DateTimeFormat(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }
            ).format(date)}`,
            showConfirmButton: true,
            confirmButtonText: "Go to Dashboard",
            buttonsStyling: false,
            customClass: {
              popup: "!rounded-3xl shadow-lg bg-white p-6 py-10",
              title: "text-lg font-bold text-blue-600",
              text: "text-gray-700",
              confirmButton:
                "!bg-primary-main text-white font-medium py-2 px-4 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 transition-all",
            },
          }).then((okay) => {
            okay && navigate("/dashboard");
          });
        }
      });
    } catch (error) {
      console.error("Error booking consultation:", error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-[88vh] bg-gradient-to-br from-blue-50 to-blue-100"
      style={{ backgroundImage: `url(${consultationBg})` }}
    >
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Book a Consultation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Consultation Type */}
          <div className="flex flex-col">
            <label className="text-primary-light font-medium mb-1">
              Consultation Type
            </label>
            <select
              disabled={loading}
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="consultation">Consultation</option>
              <option value="therapy">Sex Therapy</option>
            </select>
          </div>

          {/* Date & Time Selection */}
          <div className="flex flex-col">
            <label className="text-primary-light font-medium mb-1">
              Choose Date & Time
            </label>
            <DatePicker
              disabled={loading}
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="p-3 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Session Options */}
          <div className="space-y-2">
            <label className="text-primary-light font-medium">
              Session Options
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                disabled={loading}
                checked={audioRecording}
                onChange={() => setAudioRecording(!audioRecording)}
                className="form-checkbox text-primary-main focus:ring-primary-light mr-2"
              />
              <label className="text-gray-700">Audio Recording</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                disabled={loading}
                checked={chatEnabled}
                onChange={() => setChatEnabled(!chatEnabled)}
                className="text-primary-main focus:ring-primary-light mr-2"
              />
              <label className="text-gray-700">Enable Chat</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                disabled={loading}
                checked={callEnabled}
                onChange={() => setCallEnabled(!callEnabled)}
                className=" text-primary-main focus:ring-primary-light mr-2"
              />
              <label className="text-gray-700">Enable Call</label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-primary-main rounded-full font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main shadow-lg transition"
          >
            {loading ? "Loading..." : "Book Consultation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Consultation;
