import MouthSvg from "../assets/tooth_chart_reorganized.svg?react"
import "../styling/Odontogram.css"
import {useEffect, useRef, useState} from "react";
import {QuadrantMenu} from "./QuadrantMenu";

export const Odontogram = () => {
  const [selectedTeeth, setSelectedTeeth] = useState<Set<string>>(new Set());
  const svgRef = useRef<SVGSVGElement | null>(null);



  function toggleTooth(toothId: string) {
    setSelectedTeeth(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toothId)) {
        newSet.delete(toothId);
      } else {
        newSet.add(toothId);
      }
      return newSet;
    });
  }

  function getSelectedToothId(target: EventTarget | null) {
    if (!(target instanceof Element)) return null;

    // Walk up from the clicked element until we find a data-tooth attr
    const toothSVGGroup = target.closest(".tooth");
    if (!toothSVGGroup) return null;

    const toothId = toothSVGGroup.getAttribute("id");
    if (!toothId) return null;

    return toothId;
  }

  function onSvgClick(e: React.MouseEvent<SVGSVGElement>) {
    const tooth = getSelectedToothId(e.target);
    if (!tooth) return;
    toggleTooth(tooth);
  }

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.querySelectorAll(".tooth").forEach(toothSvgGroup => {
      const toothId = toothSvgGroup.getAttribute("id");
      if (!toothId) return;

      if (selectedTeeth.has(toothId)) {
        toothSvgGroup.setAttribute("data-selected", "true");
      } else toothSvgGroup.removeAttribute("data-selected");
    });
  }, [selectedTeeth]);



  return (
    <div id="Odontogram base">
      <QuadrantMenu svgRef={svgRef} setSelectedTeeth={setSelectedTeeth}/>
      <MouthSvg
        ref={svgRef}
        onClick={onSvgClick}
        className="tooth-chart"
        style={{width: "100%", height: "auto", cursor: "pointer"}}
      />
    </div>
  )
}