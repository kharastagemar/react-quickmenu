import React, {useRef} from "react";
import "./expanding-context-menu-item.scss";
import {useContextMenu} from "../../contextMenuContext";
import classNames from "classnames";

const RightArrowIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.45474 15.2346C8.38707 15.3062 8.33418 15.3904 8.29906 15.4824C8.26395 15.5745 8.24731 15.6725 8.2501 15.771C8.25289 15.8695 8.27504 15.9665 8.3153 16.0564C8.35556 16.1463 8.41313 16.2274 8.48474 16.2951C8.55634 16.3627 8.64057 16.4156 8.73262 16.4507C8.82466 16.4858 8.92272 16.5025 9.0212 16.4997C9.11968 16.4969 9.21664 16.4748 9.30656 16.4345C9.39647 16.3942 9.47757 16.3367 9.54524 16.2651L15.9202 9.51506C16.0519 9.37581 16.1252 9.19145 16.1252 8.99981C16.1252 8.80818 16.0519 8.62382 15.9202 8.48456L9.54524 1.73381C9.47802 1.66064 9.39693 1.60156 9.30669 1.55999C9.21644 1.51842 9.11884 1.4952 9.01954 1.49167C8.92025 1.48814 8.82124 1.50438 8.72827 1.53944C8.6353 1.5745 8.55023 1.62768 8.47799 1.69589C8.40575 1.76411 8.34778 1.846 8.30746 1.93681C8.26713 2.02762 8.24525 2.12553 8.24309 2.22487C8.24093 2.3242 8.25852 2.42298 8.29486 2.51545C8.33119 2.60793 8.38554 2.69227 8.45474 2.76356L14.3437 8.99981L8.45474 15.2346Z"
      fill="#303030"
    />
  </svg>
);

type ExpandingContextMenuItemProps = {
  text: string;
  disabled?: boolean;
  customClassname?: string;
  children: React.ReactNode;
};

function ExpandingContextMenuItem({
  text,
  disabled,
  children,
  customClassname
}: ExpandingContextMenuItemProps) {
  const {dispatch, theme} = useContextMenu();
  const expandingContextMenuItemClasses = classNames(
    "expanding-context-menu-item",
    {
      "expanding-context-menu-item--dark": theme === "dark"
    },
    customClassname || ""
  );
  const childrenId = React.isValidElement(children) ? children.props.id : null;
  const expandingItemRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={expandingItemRef}
      disabled={disabled}
      onMouseEnter={() => {
        const itemOffsetTop = expandingItemRef.current?.offsetTop;

        dispatch({
          type: "ADD_EXPENDING_MENU",
          payload: {id: childrenId, yPosition: itemOffsetTop || 0}
        });
      }}
      onMouseLeave={() => {
        dispatch({
          type: "REMOVE_EXPENDING_MENU",
          payload: {id: childrenId}
        });
      }}
      className={expandingContextMenuItemClasses}
    >
      {text}

      {RightArrowIcon}

      {children}
    </button>
  );
}

export default ExpandingContextMenuItem;
