import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PaystackButton } from "react-paystack";
import { apiBookConsultation } from "../../services/consultation";
import consultationBg from "../../assets/images/consultationBg.jpg";

const Consultation = () => {
  const [consultationType, setConsultationType] = useState("consultation");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [audioRecording, setAudioRecording] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [callEnabled, setCallEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const consultationData = {
    userId: user?.id,
    consultationType,
    date: selectedDate,
    sessionDetails: { audioRecording, chatEnabled, callEnabled },
  };

  const paystackProps = {
    email: user.email,
    amount: 3000000, // Amount in Kobo for GHS 300
    currency: "GHS",
    metadata: {
      name: user.userName,
      phone: user.phoneNumber,
    },
    publicKey: "pk_test_4b535e06b4cf2c399121e65505f2c2008f5d1820",
    text: "Pay Now",
    onSuccess: async (response) => {
      console.log("Payment Successful", response);
      try {
        // await apiBookConsultation(consultationData);
        MySwal.fire({
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
          ).format(selectedDate)}`,
          confirmButtonText: "Go to Dashboard",
          buttonsStyling: false,
          customClass: {
            popup: "!rounded-3xl shadow-lg bg-white p-6 py-10",
            title: "text-lg font-bold text-blue-600",
            confirmButton:
              "!bg-primary-main text-white font-medium py-2 px-4 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 transition-all",
          },
        }).then((okay) => {
          okay && navigate("/dashboard/appointments");
        });
      } catch (error) {
        console.error("Error booking consultation:", error);
      }
    },
    onClose: () =>
      Swal.fire({
        icon: "info",
        title: "Payment Cancelled",
        text: "You can try again anytime.",
        confirmButtonText: "Close",
      }),
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    MySwal.fire({
      title: "Proceed to Payment",
      html: (
        <div>
          <p className="mb-4 text-gray-700">
            You are required to pay a consultation fee of <b>GHS 300</b>.
          </p>
          <PaystackButton {...paystackProps} className="paystack-button" />
        </div>
      ),
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "!rounded-3xl shadow-lg bg-white p-6 py-10",
        title: "text-lg font-bold text-blue-600",
        cancelButton:
          "!bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all",
      },
    });
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

        <form onSubmit={handleBooking} className="space-y-6">
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

          <div className="flex flex-col space-y-2">
            <label htmlFor="date" className="text-blue-600 font-medium">
              Choose Date & Time
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="p-3 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholderText="Select date and time"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-primary-main rounded-full font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main shadow-lg transition"
          >
            {loading ? "Loading..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Consultation;
