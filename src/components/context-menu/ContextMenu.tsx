import {useEffect, useRef, useState} from "react";
import "./context-menu.scss";
import {createPortal} from "react-dom";
import {useContextMenu} from "../../contextMenuContext";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";

type ContextMenuProps = {
  children: React.ReactNode;
  id: number;
  customClassname?: string;
};

function ContextMenu({children, id, customClassname}: ContextMenuProps) {
  const {state, dispatch, theme} = useContextMenu();
  const contextMenuContainerClasses = classNames(
    "context-menu-container",
    {
      "context-menu-container--dark": theme === "dark"
    },
    customClassname || ""
  );
  const [containerPosition, setContainerPosition] = useState<{top: number; left: number}>(
    {top: 0, left: 0}
  );
  const contextMenuContainerRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(() => {
    dispatch({type: "HIDE_ALL"});
  });

  useEffect(() => {
    if (!contextMenuContainerRef.current?.offsetWidth) return;

    const menuState = state.menus.find((menu) => menu.id === id) || null;

    if (!menuState) return;

    const top = menuState.y;
    let left = menuState.x - contextMenuContainerRef.current?.offsetWidth;

    setContainerPosition({
      top: top,
      left: left
    });
  }, [contextMenuContainerRef, id, state.menus]);

  if (!state.menus.find((menu) => menu.id === id)?.isVisible) return null;

  return createPortal(
    <div
      className={contextMenuContainerClasses}
      style={{
        position: "absolute",
        zIndex: 100,
        top: containerPosition.top,
        left: containerPosition.left
      }}
      ref={contextMenuContainerRef}
    >
      <div ref={contextMenuRef} className="context-menu">
        {children}
      </div>
    </div>,
    document.body
  );
}

export default ContextMenu;
