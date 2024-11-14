// Consultation.js
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Optional for date selection
import "react-datepicker/dist/react-datepicker.css"; // DatePicker CSS
import { apiBookConsultation } from "../../services/consultation";
const Consultation = () => {
  const [consultationType, setConsultationType] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [date, setDate] = useState(new Date());
  const [audioRecording, setAudioRecording] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [callEnabled, setCallEnabled] = useState(true);
  
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const consultationData = {
      userId: user?._id,
      professionalId,
      consultationType,
      date,
      sessionDetails: { audioRecording, chatEnabled, callEnabled },
    };

    try {
      await apiBookConsultation(consultationData);
      navigate("/professional/appointments");
    } catch (error) {
      console.error("Error booking consultation:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Book a Consultation</h2>

        {/* Consultation Type */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Consultation Type</label>
          <select
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value)}
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="therapy">Therapy</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        {/* Professional Selection */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Select Professional</label>
          <select
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a Professional</option>
            <option value="professionalId1">Dr. John Doe</option>
            <option value="professionalId2">Dr. Jane Smith</option>
          </select>
        </div>

        {/* Date & Time Selection */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Choose Date & Time</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Session Options */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 mb-1">Session Options</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={audioRecording}
              onChange={() => setAudioRecording(!audioRecording)}
              className="mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700">Audio Recording</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={chatEnabled}
              onChange={() => setChatEnabled(!chatEnabled)}
              className="mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700">Enable Chat</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={callEnabled}
              onChange={() => setCallEnabled(!callEnabled)}
              className="mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700">Enable Call</label>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Book Consultation
        </button>
      </form>
    </div>
  );
};

export default Consultation;
