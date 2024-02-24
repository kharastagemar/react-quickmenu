## Playground

[See the live demo on playground ↗](https://react-quickmenu.vercel.app/playground)

![Gif Adı](https://i.ibb.co/Q8wpjF3/demo.gif)

---

# Installation - Quick Start

To add React Quick Menu to your project, follow these steps:

### Installation via NPM

React Quick Menu can be easily integrated into your project via NPM (Node Package Manager). Open your terminal or command prompt in the root directory of your project and run the following command:

```bash
npm install react-quickmenu --save
```

The above command will download the React Quick Menu package to your project and add it to your dependencies.

### Usage

After adding the package to your project, you can start using React Quick Menu. First, you'll need to integrate the Context Menu provider into your project. To do this, add the `ContextMenuProvider` component to a top-level component in your project.

```bash
import { ContextMenuProvider } from "react-quickmenu";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextMenuProvider theme={"dark"}>
    <App />
  </ContextMenuProvider>
);
```

Next, you can define the context menu using the `ContextMenuWrapper` component within any component where you want to use the context menu.

```bash
import { ContextMenuWrapper, ContextMenu, ContextMenuItem } from 'react-quickmenu';

const MyComponent = () => {
  const contextMenu = (
    <ContextMenu id={0}>
        <ContextMenuItem text="MenuItem 1" onClick={() => alert("MenuItem 1 clicked")} />
        <ContextMenuItem text="MenuItem 2" onClick={() => alert("MenuItem 2 clicked")} />
    </ContextMenu>
  );

  return (
    <ContextMenuWrapper contextMenu={contextMenu}>
      <div>
        {/* Content */}
      </div>
    </ContextMenuWrapper>
  );
};
```

---

# API Reference

This section provides detailed information about the components and props available in the React Quick Menu package.

### ContextMenuProvider

The `ContextMenuProvider` component is used to provide context menu functionality to the entire application. It should be rendered at the root of your application.

#### Props

- `theme` (optional): Specifies the theme to be applied to the context menu. (Default: light)

### ContextMenuWrapper

The `ContextMenuWrapper` component is used to wrap any component where you want to display a context menu. It defines the area where the context menu will appear when triggered.

#### Props

- `contextMenu`: The context menu content to be displayed.
- `children`: The child components within the wrapper where the context menu can be triggered.

### ContextMenu

The `ContextMenu` component defines a context menu group. It can contain `ContextMenuItem` and `ExpandingContextMenuItem` components.

#### Props

- `id`: A unique identifier for the context menu group.

---
**NOTE**

The first `ContextMenu` component must have `id` set to 0. Subsequent `ContextMenu` components added after it should have IDs incremented by 1, such as 1, 2, 3, and so on.

Do this ✅

```bash
    <ContextMenu id={0}>
        <ContextMenuItem text="MenuItem 1" onClick={() => alert("MenuItem 1 clicked")} />
        <ContextMenuItem text="MenuItem 2" onClick={() => alert("MenuItem 2 clicked")} />

        <ExpandingContextMenuItem text="MenuItem 3">
            <ContextMenu id={1}>
                <ContextMenuItem text="MenuItem 1" onClick={() => alert("MenuItem 1 clicked")} />
                <ContextMenuItem text="MenuItem 2" onClick={() => alert("MenuItem 2 clicked")} />
            </ContextMenu>
        </ExpandingContextMenuItem>
    </ContextMenu>
```

Avoid doing this ❌

```bash
    <ContextMenu id={1}>
        <ContextMenuItem text="MenuItem 1" onClick={() => alert("MenuItem 1 clicked")} />
        <ContextMenuItem text="MenuItem 2" onClick={() => alert("MenuItem 2 clicked")} />

        <ExpandingContextMenuItem text="MenuItem 3">
            <ContextMenu id={3}>
                <ContextMenuItem text="MenuItem 1" onClick={() => alert("MenuItem 1 clicked")} />
                <ContextMenuItem text="MenuItem 2" onClick={() => alert("MenuItem 2 clicked")} />
            </ContextMenu>
        </ExpandingContextMenuItem>
    </ContextMenu>
```
---

### ContextMenuItem

The `ContextMenuItem` component represents a single item in the context menu.

#### Props

- `text`: The text to be displayed for the menu item.
- `onClick`: The function to be called when the menu item is clicked.
- `disabled` (optional): Specifies whether the menu item is disabled.

### ExpandingContextMenuItem

The `ExpandingContextMenuItem` component represents a menu item that can expand to show additional items when clicked. This component can be nested to create a multi-level menu and must have a `ContextMenu` component as a child.

#### Props

- `text`: The text to be displayed for the menu item.
- `disabled` (optional): Specifies whether the menu item is disabled.

