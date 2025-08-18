import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ProfileCard = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo,
  enableTilt,
  enableMobileTilt,
  onContactClick,
}) => {
  const cardRef = useRef(null);
  const [pointerX, setPointerX] = useState("50%");
  const [pointerY, setPointerY] = useState("50%");
  const [rotateX, setRotateX] = useState("0deg");
  const [rotateY, setRotateY] = useState("0deg");
  const [cardOpacity, setCardOpacity] = useState(0);
  const [pointerFromCenter, setPointerFromCenter] = useState(0);
  const [pointerFromLeft, setPointerFromLeft] = useState(0.5);
  const [pointerFromTop, setPointerFromTop] = useState(0.5);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!cardRef.current || (!enableTilt && !enableMobileTilt)) return;

      if (isMobile && !enableMobileTilt) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      setPointerX(`${(x / rect.width) * 100}%`);
      setPointerY(`${(y / rect.height) * 100}%`);
      setPointerFromLeft(x / rect.width);
      setPointerFromTop(y / rect.height);
      setPointerFromCenter(
        Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) /
          Math.max(centerX, centerY)
      );
      setRotateX(`${((x - centerX) / centerX) * 10}deg`);
      setRotateY(`${((centerY - y) / centerY) * 10}deg`);
    };

    const handleMouseEnter = () => {
      setCardOpacity(1);
    };

    const handleMouseLeave = () => {
      setCardOpacity(0);
      setPointerX("50%");
      setPointerY("50%");
      setRotateX("0deg");
      setRotateY("0deg");
      setPointerFromLeft(0.5);
      setPointerFromTop(0.5);
      setPointerFromCenter(0);
    };

    const cardElement = cardRef.current;
    cardElement.addEventListener("mousemove", handlePointerMove);
    cardElement.addEventListener("mouseenter", handleMouseEnter);
    cardElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cardElement.removeEventListener("mousemove", handlePointerMove);
      cardElement.removeEventListener("mouseenter", handleMouseEnter);
      cardElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enableTilt, enableMobileTilt]);

  return (
    <div
      ref={cardRef}
      className="relative perspective-[500px] translate-z-[0.1px] touch-none"
      style={{
        "--pointer-x": pointerX,
        "--pointer-y": pointerY,
        "--pointer-from-center": pointerFromCenter,
        "--pointer-from-left": pointerFromLeft,
        "--pointer-from-top": pointerFromTop,
        "--card-opacity": cardOpacity,
        "--rotate-x": rotateX,
        "--rotate-y": rotateY,
        "--card-radius": "30px",
      }}
    >
      <div
        className="absolute inset-[-10px] bg-inherit bg-center rounded-[var(--card-radius)] transition-all duration-500 ease-out contrast-200 saturate-200 blur-[36px] scale-90 translate-z-[0.1px]"
        style={{
          backgroundImage: "var(--behind-gradient)",
        }}
      ></div>
      <div
        className="relative grid aspect-[0.718] h-[80svh] max-h-[540px] rounded-[var(--card-radius)] bg-blend-color-dodge animate-glow-bg shadow-[rgba(0,0,0,0.8)_calc((var(--pointer-from-left)*10px)-3px)_calc((var(--pointer-from-top)*20px)-6px)_20px_-5px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(0, 0, 0.1px) rotateX(${
            cardOpacity ? "var(--rotate-y)" : "0deg"
          }) rotateY(${cardOpacity ? "var(--rotate-x)" : "0deg"})`,
          backgroundImage: `
            radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(266,100%,90%,var(--card-opacity)) 4%, hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%, hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%, hsla(266,0%,60%,0) 100%),
            radial-gradient(35% 52% at 55% 20%, #00ffaac4 0%, #073aff00 100%),
            radial-gradient(100% 100% at 50% 50%, #00c1ffff 1%, #073aff00 76%),
            conic-gradient(from 124deg at 50% 50%, #c137ffff 0%, #07c6ffff 40%, #07c6ffff 60%, #c137ffff 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%",
          backgroundPosition: "0 0, 0 0, 50% 50%, 0 0",
        }}
      >
        <div
          className="absolute inset-px bg-[rgba(0,0,0,0.9)] rounded-[var(--card-radius)] translate-z-[0.01px]"
          style={{ backgroundImage: "var(--inner-gradient)" }}
        ></div>
        <div
          className="grid row-start-1 col-start-[-1] rounded-[var(--card-radius)] translate-z-[1px] overflow-hidden bg-blend-color-dodge animate-holo-bg transition-[filter] duration-600 ease-out brightness-[0.66] contrast-[1.33] saturate-[0.33] opacity-50"
          style={{
            maskImage: "var(--icon)",
            maskMode: "luminance",
            maskRepeat: "repeat",
            maskSize: "150%",
            maskPosition: `top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x))`,
            backgroundImage: `
              repeating-linear-gradient(0deg, hsl(2,100%,73%) 5%, hsl(53,100%,69%) 10%, hsl(93,100%,69%) 15%, hsl(176,100%,76%) 20%, hsl(228,100%,74%) 25%, hsl(283,100%,73%) 30%, hsl(2,100%,73%) 35%),
              repeating-linear-gradient(-45deg, #0e152e 0%, hsl(180,10%,60%) 3.8%, hsl(180,29%,66%) 4.5%, hsl(180,10%,60%) 5.2%, #0e152e 10%, #0e152e 12%),
              radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsla(0,0%,0%,0.1) 12%, hsla(0,0%,0%,0.15) 20%, hsla(0,0%,0%,0.25) 120%)
            `,
            backgroundPosition: `0 var(--background-y), var(--background-x) var(--background-y), center`,
            backgroundSize: "500% 500%, 300% 300%, 200% 200%",
            backgroundBlendMode: "color, hard-light",
          }}
        >
          <div
            className="grid row-start-1 col-start-1 bg-center bg-cover opacity-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, hsl(176,100%,76%), hsl(228,100%,74%), hsl(283,100%,73%), hsl(2,100%,73%), hsl(53,100%,69%), hsl(93,100%,69%)),
                radial-gradient(circle at var(--pointer-x) var(--pointer-y), hsl(0,0%,70%) 0%, hsla(0,0%,30%,0.2) 90%),
                var(--grain)
              `,
              backgroundSize: "250% 250%, 100% 100%, 220px 220px",
              backgroundPosition: `var(--pointer-x) var(--pointer-y), center, calc(var(--pointer-x)*0.01) calc(var(--pointer-y)*0.01)`,
              backgroundBlendMode: "color-dodge",
              filter: `brightness(calc(2 - var(--pointer-from-center))) contrast(calc(var(--pointer-from-center) + 2)) saturate(calc(0.5 + var(--pointer-from-center)))`,
              mixBlendMode: "luminosity",
            }}
          ></div>
          <div
            className="grid row-start-1 col-start-1 bg-center bg-cover opacity-0"
            style={{
              backgroundPosition: `0 var(--background-y), calc(var(--background-x)*0.4) calc(var(--background-y)*0.5), center`,
              backgroundSize: "200% 300%, 700% 700%, 100% 100%",
              mixBlendMode: "difference",
              filter: "brightness(0.8) contrast(1.5)",
            }}
          ></div>
        </div>
        <div
          className="grid row-start-1 col-start-[-1] rounded-[var(--card-radius)] translate-z-[1.1px] overflow-hidden bg-blend-overlay brightness-[0.8] contrast-120"
          style={{
            backgroundImage: `radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsl(248,25%,80%) 12%, hsla(207,40%,30%,0.8) 90%)`,
          }}
        ></div>
        <div className="grid row-start-1 col-start-[-1] rounded-[var(--card-radius)] overflow-hidden bg-blend-screen">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="absolute left-1/2 -translate-x-1/2 bottom-0.5 scale-100"
            style={{ opacity: `calc(1.75 - var(--pointer-from-center))` }}
          />
          <div
            className="absolute inset-0 z-[1] backdrop-blur-[30px]"
            style={{
              mask: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100%)",
            }}
          ></div>
        </div>
        <div
          className="grid row-start-1 col-start-[-1] text-center relative translate-z-[0.1px] z-[5] bg-blend-luminosity"
          style={{
            transform: `translate3d(calc(var(--pointer-from-left) * -6px + 3px), calc(var(--pointer-from-top) * -6px + 3px), 0.1px)`,
          }}
        >
          <div className="absolute top-12 flex flex-col w-full">
            <h3 className="font-semibold text-[min(5svh,3em)] m-0 bg-gradient-to-b from-white to-[#6f6fbe] bg-[length:1em_1.5em] text-transparent bg-clip-text">
              {name}
            </h3>
            <p className="font-semibold text-base -mt-3 mx-auto whitespace-nowrap w-min bg-gradient-to-b from-white to-[#4a4ac0] bg-[length:1em_1.5em] text-transparent bg-clip-text">
              {title}
            </p>
          </div>
        </div>
        {showUserInfo && (
          <div className="absolute bottom-5 left-5 right-5 z-[2] flex items-center justify-between bg-[rgba(255,255,255,0.1)] backdrop-blur-[30px] border border-[rgba(255,255,255,0.1)] rounded-[15px] p-3.5 pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[rgba(255,255,255,0.1)] flex-shrink-0">
                <img
                  src={avatarUrl}
                  alt="Mini Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <span className="text-sm font-medium text-[rgba(255,255,255,0.9)] leading-none">
                  {handle}
                </span>
                <span className="text-sm text-[rgba(255,255,255,0.7)] leading-none">
                  {status}
                </span>
              </div>
            </div>
            <button
              className="border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-sm font-semibold text-[rgba(255,255,255,0.9)] cursor-pointer transition-all duration-200 ease-out backdrop-blur-[10px] hover:border-[rgba(255,255,255,0.4)] hover:-translate-y-px"
              onClick={onContactClick}
            >
              {contactText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  contactText: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  showUserInfo: PropTypes.bool,
  enableTilt: PropTypes.bool,
  enableMobileTilt: PropTypes.bool,
  onContactClick: PropTypes.func,
};

ProfileCard.defaultProps = {
  showUserInfo: true,
  enableTilt: true,
  enableMobileTilt: false,
  onContactClick: () => {},
};

export default ProfileCard;
