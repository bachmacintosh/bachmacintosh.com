import { createRef, useState, } from "react";
import { createPopper, } from "@popperjs/core";

export default function WanikaniSubject({ subjectType, meanings, href, children, },) {
  const [tooltipShow, setTooltipShow,] = useState(false,);
  const btnRef = createRef();
  const tooltipRef = createRef();

  const openLeftTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, { placement: "top", },);
    setTooltipShow(true,);
  };
  const closeLeftTooltip = () => {
    setTooltipShow(false,);
  };

  let color = "gray-500";
  if (subjectType === "radical") {
    color = "bg-wanikani-radical";
  } else if (subjectType === "kanji") {
    color = "bg-wanikani-kanji";
  } else if (subjectType === "vocabulary") {
    color = "bg-wanikani-vocabulary";
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="text-center">
          <a className={`${color } text-white font-bold text-sm px-1 py-1 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
            type="button"
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            ref={btnRef}
            href={href} target="_blank" rel="nofollow noreferrer noopener"
            style={{ fontFamily: "Noto Sans JP", }}
          >
            {children}
          </a>
          <div
            className={`${tooltipShow ? "" : "hidden " }h-auto border-0 inline z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words`}
            ref={tooltipRef}
          >
            <div>
              <div className="text-white p-3 bg-gray-500">
                {meanings}
              </div>
            </div>
            <div className="w-0 h-0 border-4 border-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}
