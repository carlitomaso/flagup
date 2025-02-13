import { useEffect, useRef, useState } from "react";

const Cat = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [buttonClick, setButtonClick] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          console.log("Audio autoplayed successfully.");
        } catch (err) {
          console.log("Autoplay blocked, waiting for user interaction.");
        }
      }
    };

    playAudio();
  }, [buttonClick]);

  const CatPlay = () => {
    return (
      <div className="container">
        <a
          style={{
            padding: "10px 20px",
            border: "2px solid black",
            borderRadius: "20px",
            cursor: "pointer",
            position: "fixed",
            opacity: !buttonClick ? "1" : "0",
          }}
          onClick={() => {
            setButtonClick(true);
          }}
        >
          Expand
        </a>
        <audio ref={audioRef} src="/oiiai.mp3" loop />
        <img
          src="/spinning-cat.gif"
          alt="Spinning Cat"
          onClick={() => {
            audioRef.current?.play();
            setButtonClick(true);
          }}
          style={{ opacity: buttonClick ? "1" : "0" }}
        />
        <h1 style={{ opacity: buttonClick ? "1" : "0" }}>
          Save the date 02/14/25!!!
        </h1>
      </div>
    );
  };

  return <CatPlay />;
};

export default Cat;
