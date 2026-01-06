import {useState} from "react";

export const InitialQuadrantStatuses = new Map([
  ["PRIMARY_UPPER_LEFT", false],
  ["PRIMARY_UPPER_RIGHT", false],
  ["PRIMARY_LOWER_LEFT", false],
  ["PRIMARY_LOWER_RIGHT", false],
  ["PERMANENT_UPPER_LEFT", false],
  ["PERMANENT_UPPER_RIGHT", false],
  ["PERMANENT_LOWER_LEFT", false],
  ["PERMANENT_LOWER_RIGHT", false],
])

type QuadrantKeys = typeof InitialQuadrantStatuses[keyof typeof InitialQuadrantStatuses];

export type QuadrantMenuProps = {
  svgRef: React.RefObject<SVGSVGElement | null>,
  setSelectedTeeth: (selectedTeeth: Set<string>) => void,
}

export const QuadrantMenu = ({svgRef, setSelectedTeeth}: QuadrantMenuProps) => {
  const [activeQuadrants, setActiveQuadrants] = useState<Map<QuadrantKeys, boolean>>(InitialQuadrantStatuses);

  function addTeeth(toothIdArray: Array<string>) {
    setSelectedTeeth(prev => {
      const newSet = new Set(prev)
      toothIdArray.forEach(toothId => {
        newSet.add(toothId)
      })
      return newSet
    })
  }

  function removeTeeth(toothIdArray: Array<string>) {
    setSelectedTeeth(prev => {
      const newSet = new Set(prev)
      toothIdArray.forEach(toothId => {
        newSet.delete(toothId)
      })
      return newSet
    })
  }

  function getTeethFromQuadrant(toothClassName: "PRIMARY" | "PERMANENT", quadrantName: "UPPER_LEFT" | "UPPER_RIGHT" | "LOWER_LEFT" | "LOWER_RIGHT") {
    const pendingTeeth = new Array<string>();
    if (!svgRef.current) return;

    const toothKey = `${toothClassName}_${quadrantName}`

    const toothClassGroup = svgRef.current.querySelector(`#${toothClassName}`)
    if (!toothClassGroup) return;
    const quadrantGroup = toothClassGroup.querySelector(`#${quadrantName}`)
    if (!quadrantGroup) return;
    quadrantGroup.querySelectorAll(".tooth").forEach(tooth => {
      const id = tooth.getAttribute("id");
      if (!id) return;
      pendingTeeth.push(id)
    })

    if (pendingTeeth.length === 0) return;
    if (activeQuadrants.get(toothKey) === true) {
      removeTeeth(pendingTeeth);
    } else {
      addTeeth(pendingTeeth);
    }
    setActiveQuadrants(prevState => {
      const newState = new Map([...prevState]);
      const newStatus = !newState.get(toothKey);
      newState.set(toothKey, newStatus);
      return newState
    })
  }

  function onPrimaryUpperLeftClick(_: React.MouseEvent) {
    getTeethFromQuadrant("PRIMARY", "UPPER_LEFT")
  }

  function onPrimaryUpperRightClick(_: React.MouseEvent) {
    getTeethFromQuadrant("PRIMARY", "UPPER_RIGHT")
  }

  function onPrimaryLowerLeftClick(_: React.MouseEvent) {
    getTeethFromQuadrant("PRIMARY", "LOWER_LEFT")
  }

  function onPrimaryLowerRightClick(_: React.MouseEvent) {
    getTeethFromQuadrant("PRIMARY", "LOWER_RIGHT")
  }

  function onPermanentUpperLeftClick(_: React.MouseEvent) {
    getTeethFromQuadrant("PERMANENT", "UPPER_LEFT")
  }

  function onPermanentUpperRightClick(_: React.MouseEvent) {
    getTeethFromQuadrant("PERMANENT", "UPPER_RIGHT")
  }

  function onPermanentLowerLeftClick(_: React.MouseEvent) {
    getTeethFromQuadrant("PERMANENT", "LOWER_LEFT")
  }

  function onPermanentLowerRightClick(_: React.MouseEvent) {
    getTeethFromQuadrant("PERMANENT", "LOWER_RIGHT")
  }


  return (
    <div style={{display: "flex", flexDirection: "row", gap: "4rem"}}>
      <div>
        <label htmlFor={'permanent-quadrant-menu'}>PERMANENT QUADRANTS</label>
        <div id={"permanent-quadrant-menu"}
             style={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               gap: "2rem"
             }}>
          <div className={"quadrant-container"}>
            <div className={"quadrant-item"}>
              <input
                id={"select-permanent-upper-left"}
                onClick={onPermanentUpperLeftClick}
                type={"checkbox"}
                value={"PERMANENT_UPPER_LEFT"}
              />
              <label htmlFor={"select-permanent-upper-right"}>UPPER LEFT</label>
            </div>
            <div className={"quadrant-item"}>
              <input
                id={"select-permanent-lower-left"}
                onClick={onPermanentLowerLeftClick}
                type={"checkbox"}
                value={"PERMANENT_LOWER_LEFT"}
              />
              <label htmlFor={"select-permanent-lower-left"}>LOWER LEFT</label>
            </div>
          </div>

          <div className={"quadrant-container"}>
            <div className={"quadrant-item"}>
              <input
                id={"select-permanent-upper-right"}
                onClick={onPermanentUpperRightClick}
                type={"checkbox"}
                value={"PERMANENT_UPPER_RIGHT"}
              />
              <label htmlFor={"select-permanent-upper-right"}>UPPER RIGHT</label>
            </div>
            <div className={"quadrant-row"}>
              <input
                id={"select-permanent-lower-right"}
                onClick={onPermanentLowerRightClick}
                type={"checkbox"}
                value={"PERMANENT_LOWER_RIGHT"}
              />
              <label htmlFor={"select-permanent-lower-right"}>LOWER RIGHT</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label htmlFor={'primary-quadrant-menu'}>PRIMARY QUADRANTS</label>
        <div id={"primary-quadrant-menu"}
             style={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               gap: "2rem"
             }}>
          <div className={"quadrant-container"}>
            <div className={"quadrant-item"}>
              <input
                id={"select-primary-upper-left"}
                onClick={onPrimaryUpperLeftClick}
                type={"checkbox"}
                value={"PRIMARY_UPPER_LEFT"}
              />
              <label htmlFor={"select-primary-upper-right"}>UPPER LEFT</label>
            </div>
            <div className={"quadrant-item"}>
              <input
                id={"select-primary-lower-left"}
                onClick={onPrimaryLowerLeftClick}
                type={"checkbox"}
                value={"PRIMARY_LOWER_LEFT"}
              />
              <label htmlFor={"select-primary-lower-left"}>LOWER LEFT</label>
            </div>
          </div>

          <div className={"quadrant-container"}>
            <div className={"quadrant-item"}>
              <input
                id={"select-primary-upper-right"}
                onClick={onPrimaryUpperRightClick}
                type={"checkbox"}
                value={"PRIMARY_UPPER_RIGHT"}
              />
              <label htmlFor={"select-primary-upper-right"}>UPPER RIGHT</label>
            </div>
            <div className={"quadrant-row"}>
              <input
                id={"select-primary-lower-right"}
                onClick={onPrimaryLowerRightClick}
                type={"checkbox"}
                value={"PRIMARY_LOWER_RIGHT"}
              />
              <label htmlFor={"select-primary-lower-right"}>LOWER RIGHT</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}