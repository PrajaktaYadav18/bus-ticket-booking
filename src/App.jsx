import React, { useState } from "react";
import "./App.css";

function App() {

  // TOTAL SEATS

  const seats = Array.from(
    { length: 60 },
    (_, i) => i + 1
  );

  // BOOKED SEATS

  const [bookedSeats, setBookedSeats] = useState([]);

  // SELECTED SEATS

  const [selectedSeats, setSelectedSeats] = useState([]);

  // REMAINING SEATS

  const remainingSeats =
    seats.length - bookedSeats.length;

  // SEAT CLICK

  const handleSeatClick = (seatNo) => {

    // ALL SEATS BOOKED

    if (bookedSeats.length === seats.length) {

      alert("No Seats Available");

      return;
    }

    // ALREADY BOOKED

    if (bookedSeats.includes(seatNo)) {

      alert("Seat Already Booked");

      return;
    }

    // REMOVE SELECTED SEAT

    if (selectedSeats.includes(seatNo)) {

      setSelectedSeats(

        selectedSeats.filter(
          (seat) => seat !== seatNo
        )

      );

    } else {

      // MAX 3 SEATS

      if (selectedSeats.length >= 3) {

        alert(
          "You Can Select Maximum 3 Seats"
        );

        return;
      }

      setSelectedSeats([
        ...selectedSeats,
        seatNo
      ]);
    }
  };

  // CONFIRM BOOKING

  const confirmBooking = () => {

    // ALL BOOKED

    if (bookedSeats.length === seats.length) {

      alert("All Seats Are Booked");

      return;
    }

    // NO SEAT SELECTED

    if (selectedSeats.length === 0) {

      alert("Please Select Seats");

      return;
    }

    // UPDATE BOOKED SEATS

    const updatedBookedSeats = [

      ...bookedSeats,
      ...selectedSeats

    ];

    setBookedSeats(updatedBookedSeats);

    // SUCCESS MESSAGE

    alert(

      `Seats ${selectedSeats.join(", ")}
       Booked Successfully`

    );

    // CLEAR SELECTED SEATS

    setSelectedSeats([]);

    // REMAINING

    const remaining =

      seats.length -
      updatedBookedSeats.length;

    // LOW SEATS ALERT

    if (remaining <= 5 && remaining > 0) {

      alert(
        `Only ${remaining} Seats Remaining`
      );
    }

    // FULLY BOOKED

    if (remaining === 0) {

      alert("All Seats Are Booked");
    }
  };

  return (

    <div className="container">

      {/* TITLE */}

      <h1>
        🚌 Luxury Bus Ticket Booking
      </h1>

      {/* DRIVER SCREEN */}

      <div className="screen"></div>

      <p className="screen-text">
        DRIVER SIDE
      </p>

      {/* INFO CARDS */}

      <div className="info-box">

        <div className="info-card">

          <h2>Total Seats</h2>

          <p>{seats.length}</p>

        </div>

        <div className="info-card">

          <h2>Booked</h2>

          <p>{bookedSeats.length}</p>

        </div>

        <div className="info-card">

          <h2>Remaining</h2>

          <p>{remainingSeats}</p>

        </div>

      </div>

      {/* STATUS */}

      <div className="status-container">

        <div className="status">

          <div className="box available"></div>

          <span>Available</span>

        </div>

        <div className="status">

          <div className="box selected-box"></div>

          <span>Selected</span>

        </div>

        <div className="status">

          <div className="box booked-box"></div>

          <span>Booked</span>

        </div>

      </div>

      {/* SEATS */}

      <div className="seat-container">

        {seats.map((seat) => (

          <div

            key={seat}

            className={`seat

              ${bookedSeats.includes(seat)
                ? "booked"
                : ""
              }

              ${selectedSeats.includes(seat)
                ? "selected"
                : ""
              }

            `}

            onClick={() =>
              handleSeatClick(seat)
            }

          >
            {seat}

          </div>

        ))}

      </div>

      {/* SELECTED SEATS */}

      <h3>

        Selected Seats :

        {

          selectedSeats.length > 0

          ? selectedSeats.join(", ")

          : " None"

        }

      </h3>

      {/* BUTTON */}

      <button onClick={confirmBooking}>

        Confirm Booking

      </button>

    </div>
  );
}

export default App;