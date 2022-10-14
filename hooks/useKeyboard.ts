import { SetStateAction, useEffect } from "react";
import { AppState } from "../components/App/App";
function isArrowKey(keyCode: string) {
  return (
    keyCode === KEYS.ARROW_LEFT ||
    keyCode === KEYS.ARROW_RIGHT ||
    keyCode === KEYS.ARROW_DOWN ||
    keyCode === KEYS.ARROW_UP
  );
}
const KEYS = {
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ESCAPE: "Escape",
  DELETE: "Delete",
  BACKSPACE: "Backspace",
  SPACE: "Space",
};
let STEP = 50;

function useKeyboard(setAppState: (value: SetStateAction<AppState>) => void) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isArrowKey(e.code)) {
        if (e.key === KEYS.ARROW_LEFT)
          setAppState((prev) => ({
            ...prev,
            cameraOffset: {
              x: prev.cameraOffset.x - STEP,
              y: prev.cameraOffset.y,
            },
          }));
        else if (e.key === KEYS.ARROW_RIGHT)
          setAppState((prev) => ({
            ...prev,
            cameraOffset: {
              x: prev.cameraOffset.x + STEP,
              y: prev.cameraOffset.y,
            },
          }));
        else if (e.key === KEYS.ARROW_UP)
          setAppState((prev) => ({
            ...prev,
            cameraOffset: {
              x: prev.cameraOffset.x,
              y: prev.cameraOffset.y - STEP,
            },
          }));
        else if (e.key === KEYS.ARROW_DOWN)
          setAppState((prev) => ({
            ...prev,
            cameraOffset: {
              x: prev.cameraOffset.x,
              y: prev.cameraOffset.y + STEP,
            },
          }));
      }
      if (e.code === "KeyS") {
        setAppState((prev) => ({
          ...prev,
          mode: "select",
        }));
      }
      if (e.code === "KeyD") {
        setAppState((prev) => ({
          ...prev,
          mode: "drag",
        }));
      }
    }

    document.addEventListener("keydown", handleKeyDown, false);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setAppState]);
}

export default useKeyboard;