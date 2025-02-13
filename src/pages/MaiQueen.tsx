import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MaiQueen = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      {unlocked ? <Envelope /> : <LockScreen setUnlocked={setUnlocked} />}
      {unlocked && (
        <div className="back">
          <a onClick={() => setUnlocked(false)}>←</a>
        </div>
      )}
    </>
  );
};

type MyComponentProps = {
  setUnlocked: (boolean: boolean) => void;
};

const Envelope = () => {
  const [envelopeClick, setEnvelopeClick] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => setRendered(true), []);

  return (
    <div className={`container2 ${rendered && "fade-in"}`}>
      <div className={`envelope-wrapper ${envelopeClick && "flap"}`}>
        <div
          className="envelope"
          onClick={() => setEnvelopeClick(!envelopeClick)}
        >
          <div className="letter">
            <div className="text">
              <strong>Dear Innes Enley,</strong>
              <p>
                I'm so happy to be your partner and I love you so much. Will you
                be my valentine? &nbsp;&nbsp;&nbsp;&nbsp;
                <Link
                  to="/thebest"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "green " }}
                >
                  Yes
                </Link>{" "}
                or{" "}
                <a
                  style={{
                    color: "red",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  No
                </a>
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Carl
              </p>
            </div>
          </div>
        </div>
        <div
          className="heart"
          onClick={() => setEnvelopeClick(!envelopeClick)}
        ></div>
      </div>
    </div>
  );
};

const LockScreen = ({ setUnlocked }: MyComponentProps) => {
  const correctPin = "0926"; // Example PIN
  const [currentPin, setCurrentPin] = useState("");
  const [message, setMessage] = useState("");

  function resetPin() {
    setCurrentPin("");
    // updateDots();
    setMessage("");
  }

  const [fadingOut, setFadingOut] = useState(false);

  const handleUnlock = () => {
    setMessage("Unlocked!");
    setFadingOut(true); // Start fade-out

    setTimeout(() => {
      resetPin();
      setUnlocked(true);
    }, 1500); // Match the transition duration
  };

  const handleButtonClick = (num: string) => {
    if (num === "-") {
      setCurrentPin(currentPin.slice(0, -1));
    } else {
      const newPin = currentPin + num;
      setCurrentPin(newPin);
      if (newPin.length === 4) {
        // Use newPin instead of currentPin for checking
        if (newPin === correctPin) {
          handleUnlock();
        } else {
          setMessage("Incorrect PIN");
          setTimeout(resetPin, 1000);
        }
      }
    }
  };

  return (
    <div className={`container ${fadingOut ? "fade-out" : ""}`}>
      <div className="pin-display">
        <div
          className={currentPin.length >= 1 ? "filled pin-dot" : "pin-dot"}
        ></div>
        <div
          className={currentPin.length >= 2 ? "filled pin-dot" : "pin-dot"}
        ></div>
        <div
          className={currentPin.length >= 3 ? "filled pin-dot" : "pin-dot"}
        ></div>
        <div
          className={currentPin.length >= 4 ? "filled pin-dot" : "pin-dot"}
        ></div>
      </div>

      <div className="keypad">
        <button
          className="key"
          onClick={() => {
            handleButtonClick("1");
          }}
        >
          1
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("2");
          }}
        >
          2
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("3");
          }}
        >
          3
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("4");
          }}
        >
          4
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("5");
          }}
        >
          5
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("6");
          }}
        >
          6
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("7");
          }}
        >
          7
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("8");
          }}
        >
          8
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("9");
          }}
        >
          9
        </button>
        <button className="key" style={{ visibility: "hidden" }}></button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("0");
          }}
        >
          0
        </button>
        <button
          className="key"
          onClick={() => {
            handleButtonClick("-");
          }}
          id="backspace"
        >
          ⌫
        </button>
      </div>

      <div className="message">{message}</div>
    </div>
  );
};

export default MaiQueen;
