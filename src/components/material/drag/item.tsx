import { cloneElement } from "react";
import Extra from "./extra";
import { store } from ".";

export default ({
  index,
  dragId,
  onAdd,
  onDrop,
  children,
  virtual = false,
  accept = true,
  selected = false,
  onSelected,
  onDelete,
  onCopy,
}: any) => {
  /** 扩展节点 */
  const className = [children?.props?.className];
  if (accept) {
    className.push("drag-item");
    if (selected) {
      className.push("drag-item-selected");
    }
  }
  let extraNode = null;
  if (accept && selected) {
    extraNode = <Extra onDelete={onDelete} onCopy={onCopy} />;
  }
  const Element = cloneElement(children, {
    children: [children.props.children, extraNode].filter(Boolean),
    className: className.filter(Boolean).join(" "),
    style: {
      ...children?.props?.style,
      cursor: virtual ? "not-allowed" : "move",
      borderLeft: accept ? "2px solid #fff" : "",
    },
    draggable: true,
    onClick: () => {
      onSelected?.();
    },
    onDragOver: (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (
        (String(store.index) !== String(index) || store.dragId !== dragId) &&
        accept
      ) {
        e.currentTarget.style.borderLeft =
          "2px solid var(--drag-primary-color) !important";
      }
    },
    onDragEnter: (e) => {
      e.stopPropagation();
      if (
        (String(store.index) !== String(index) || store.dragId !== dragId) &&
        accept
      ) {
        e.currentTarget.style.borderLeft =
          "2px solid var(--drag-primary-color) !important";
      }
    },
    onDragLeave: (e) => {
      e.stopPropagation();
      if (accept) {
        e.currentTarget.style.borderLeft = "2px solid #fff";
      }
    },
    onDrop: (e) => {
      e.stopPropagation();
      const _dragId = store.dragId;
      const _index = store.index;
      if (accept) {
        // 同一个模块之间的移动
        if (_dragId === dragId) {
          onDrop?.(String(_index), String(index));
        } else {
          onAdd?.(store[_dragId][_index], String(index)); // 把这个外部的item插入到内部的index位置
        }
      }
      if (accept) {
        e.currentTarget.style.borderLeft = "2px solid #fff";
      }
    },
    onDragStart: (e) => {
      e.stopPropagation();
      store.index = index;
      store.dragId = dragId;
      e.currentTarget.style.opacity = "0.3";
    },
    onDragEnd: (e) => {
      e.stopPropagation();
      delete store.index;
      delete store.dragId;
      e.currentTarget.style.opacity = "1";
      if (accept) {
        e.currentTarget.style.borderLeft = "2px solid #fff";
      }
    },
  });
  return Element;
};
