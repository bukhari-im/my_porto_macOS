import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
subtittle: {min: 100, max: 400, default: 100},
tittle: {min: 400, max: 900, default: 400},
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span key={i} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ))
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");

  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Cek apakah mouse sedang berada di area tulisan
    const isInside =
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom;

    if (!isInside) {
      letters.forEach((letter) =>
        animateLetter(letter, base, 0.3)
      );
      return;
    }

    letters.forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();

      const letterCenter =
        letterRect.left + letterRect.width / 2;

      const distance = Math.abs(mouseX - letterCenter);

      const intensity = Math.exp(
        -(distance ** 2) / 10000
      );

      const weight =
        min + (max - min) * intensity;

      animateLetter(letter, weight);
    });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
};

const Welcome = () => {
  
  const tittleRef = useRef(null);

  const subtittleRef = useRef(null);

  useGSAP(() => {
    const tittleCleanup = setupTextHover(tittleRef.current, "tittle");
    const subtittleCleanup = setupTextHover(subtittleRef.current, "subtittle");
    return () => {
      tittleCleanup();
      subtittleCleanup();
    };
  }, []);

  return <section id="welcome">
    <p ref={subtittleRef}>{renderText("Hello, I'm Imam! Welcome to my ", "text-3xl font-georama", 100)}</p>
    <h1 ref={tittleRef} className="mt-7">
      {renderText(
  "portofolio",
  "text-9xl italic font-georama text-blue-50 drop-shadow-[0_0_15px_rgba(147,197,253,0.7)]")}
      </h1>
      <div className="small-screen">
        <p>This Portofolio is designed for desktop/tabled screens only.</p>
      </div>

  </section>;
  
};

export default Welcome;
