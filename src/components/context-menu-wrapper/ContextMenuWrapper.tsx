import "./context-menu-wrapper.scss";
import {useContextMenu} from "../../contextMenuContext";

type ContextMenuWrapperProps = {
  children: React.ReactNode;
  contextMenu: React.ReactNode;
};

function ContextMenuWrapper({children, contextMenu}: ContextMenuWrapperProps) {
  const {dispatch} = useContextMenu();

  return (
    <div
      className="context-menu-wrapper"
      onContextMenu={(e) => {
        e.preventDefault();
        const menuOverflowsX = e.clientX + 212 > window.innerWidth;
        const menuOverflowsY = e.clientY + 212 > window.innerHeight;

        dispatch({
          type: "SHOW",
          payload: {
            id: 0,
            x: menuOverflowsX ? e.clientX : e.clientX + 212,
            y: menuOverflowsY ? e.clientY - 130 : e.clientY
          }
        });
      }}
    >
      {contextMenu}

      {children}
    </div>
  );
}

export default ContextMenuWrapper;
