import "./context-menu-item.scss";
import {useContextMenu} from "../../contextMenuContext";
import classNames from "classnames";

type ContextMenuItemProps = {
  disabled?: boolean;
  text: string;
  onClick: () => void;
  customClassname?: string;
};

function ContextMenuItem({
  disabled,
  text,
  onClick,
  customClassname
}: ContextMenuItemProps) {
  const {dispatch, theme} = useContextMenu();
  const contextMenuItemClasses = classNames(
    "context-menu-item",
    {
      "context-menu-item--dark": theme === "dark"
    },
    customClassname || ""
  );

  return (
    <button
      className={contextMenuItemClasses}
      onClick={() => {
        onClick();

        dispatch({type: "HIDE_ALL"});
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default ContextMenuItem;
