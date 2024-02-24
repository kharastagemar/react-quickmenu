import {createContext, useContext, useReducer} from "react";

type ContextMenuState = {
  menus: {
    id: number;
    isVisible: boolean;
    x: number;
    y: number;
  }[];
  lastExpandingItemCursorX: number | null;
};

const initialState = {
  menus: [
    {
      id: 0,
      isVisible: false,
      x: 0,
      y: 0
    }
  ],
  lastExpandingItemCursorX: null
} as ContextMenuState;

const ContextMenuContext = createContext({});

type ContextMenuAction =
  | {type: "SHOW"; payload: {id: number; x: number; y: number}}
  | {type: "HIDE_ALL"}
  | {type: "ADD_EXPENDING_MENU"; payload: {id: number; yPosition: number}}
  | {type: "REMOVE_EXPENDING_MENU"; payload: {id: number}}
  | {type: "SET_LAST_EXPANDING_ITEM_CURSOR_X"; payload: {xPosition: number}};

const contextMenuReducer = (state: ContextMenuState, action: ContextMenuAction) => {
  switch (action.type) {
    case "SHOW":
      const {id, x, y} = action.payload;

      const newMenus = state.menus.map((menu) => {
        if (menu.id === id) {
          return {
            ...menu,
            isVisible: true,
            x,
            y
          };
        }
        return menu;
      });

      return {
        ...state,
        menus: newMenus
      };

    case "HIDE_ALL":
      return initialState;

    case "ADD_EXPENDING_MENU":
      const {id: newId, yPosition} = action.payload;
      const menuOverflowsX =
        state.menus[state.menus.length - 1].x + 212 > window.innerWidth;
      const newMenu = {
        id: newId,
        isVisible: true,
        x: menuOverflowsX
          ? state.menus[state.menus.length - 1].x - 206
          : state.menus[state.menus.length - 1].x + 206,
        y: state.menus[state.menus.length - 1].y + yPosition
      };

      return {
        ...state,
        menus: [...state.menus, newMenu]
      };

    case "REMOVE_EXPENDING_MENU":
      const {id: idToRemove} = action.payload;

      const newMenusAfterRemove = state.menus.filter((menu) => menu.id !== idToRemove);

      return {
        ...state,
        menus: newMenusAfterRemove
      };

    case "SET_LAST_EXPANDING_ITEM_CURSOR_X":
      const {xPosition} = action.payload;

      return {
        ...state,
        lastExpandingItemCursorX: xPosition
      };

    default:
      return state;
  }
};

type ContextMenuProviderProps = {
  children: React.ReactNode;
  theme?: "light" | "dark";
};

export function ContextMenuProvider({children, theme}: ContextMenuProviderProps) {
  const [state, dispatch] = useReducer(contextMenuReducer, initialState);

  theme = theme || "light";

  return (
    <ContextMenuContext.Provider value={{state, dispatch, theme}}>
      {children}
    </ContextMenuContext.Provider>
  );
}

export function useContextMenu() {
  return useContext(ContextMenuContext) as {
    state: ContextMenuState;
    dispatch: React.Dispatch<ContextMenuAction>;
    theme: "light" | "dark";
  };
}

export default ContextMenuContext;
