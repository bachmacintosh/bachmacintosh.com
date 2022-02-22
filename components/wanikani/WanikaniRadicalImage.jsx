import { createRef, useState, } from "react";
import { createPopper, } from "@popperjs/core";

export default function WaniKaniRadicalImage (
  { subjectType, stage, meanings, href, svg, },) {
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

  let color = "bg-gray-500";
  if (stage === "9") {
    color = "bg-yellow-600";
  } else if (subjectType === "radical") {
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
          <a className={`${color} block w-7 h-7 fill-white px-2 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
            type="button"
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            ref={btnRef}
            href={href} target="_blank" rel="nofollow noreferrer noopener"
            style={{ strokeWidth: 120, }}
            dangerouslySetInnerHTML={{ __html: svg, }}
          >
          </a>
          <div
            className={`${tooltipShow ? "" : "hidden "}h-auto border-0 inline z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words`}
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
