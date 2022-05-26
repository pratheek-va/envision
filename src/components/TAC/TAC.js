import React from "react";
import "./TAC.css";

const TAC = () => {
  return (
    <React.Fragment>
      <div class="title">
        <h2>Terms and Conditions</h2>
      </div>
      <div>
        <div class="termsAndCondition">
          <div>
            <ul class="indent">
              <li>
                Envision is a National level techno-cultural festival for the
                students of technical institutes across the country and open to
                all the colleges in the country.
              </li>
              <li>Participants from only same colleges can form a team.</li>
              <li>
                The registrations for events are done via invites. Please refer
                the event details provided under special/core events for more
                details.
              </li>
              <li>
                Participants must follow all the rules and regulations of the
                college. Display of any unruly behaviour shall lead to
                disqualification of the team and expulsion of the participant
                from the fest.
              </li>
              <li>
                Consumption of any alcoholic drinks, use of any hallucinogenic
                drugs and other illegal substances anywhere in the institute
                campus is strictly prohibited and any person who has consumed
                such substances and makes an attempt to enter the campus will
                not be allowed inside{" "}
              </li>
              <li>
                Organisers hold the right to change the rules of the event
                before the event begins without prior notice.
              </li>
              <li>
                SIT is not responsible for any loss or damage of participant's
                personal belongings.
              </li>
              <li>
                The participant must also present their college ID card
                (compulsory) and Valid government issued ID Proof (Any one)
                (Aadhaar, Driving license, Voter ID, etc.).
              </li>
            </ul>
          </div>
          <div class="text-igold">
            <h3>IMPORTANT</h3>
            <p>
              Any participant found violating the above rules may be immediately
              expelled from the campus. His/her registration from all the events
              may be cancelled and he/she will be penalised appropriately. SIT
              reserves the right to take appropriate legal actions in such
              cases.
            </p>
          </div>
          <div>
            <h3>Refund Policy</h3>
            <p>
              Refunds will not be provided for any case. Please reach out to the
              Technical Heads of Envision for queries.<br></br>
              <p class="contact">
                Saad Salman <br></br>
                Envision Organizing Secretary <br></br>
                <a href="tel:+918792971070" class="contact">
                  +918792971070
                </a>{" "}
                <br></br>
                <a href="mailto:saadsalman.cool@gmail.com" class="contact">
                  saadsalman.cool@gmail.com
                </a>{" "}
                <br></br>
              </p>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TAC;
