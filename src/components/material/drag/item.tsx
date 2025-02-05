import { cloneElement } from "react";
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
  const Element = cloneElement(children, {
    className: accept
      ? selected
        ? "drag-item-selected"
        : "drag-item"
      : undefined,
    style: {
      ...children?.props?.style,
      cursor: virtual ? "not-allowed" : "move",
      borderLeft: accept ? "2px solid var(--bg-color)" : "",
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
          "2px solid var(--primary-color) !important";
      }
    },
    onDragEnter: (e) => {
      e.stopPropagation();
      if (
        (String(store.index) !== String(index) || store.dragId !== dragId) &&
        accept
      ) {
        e.currentTarget.style.borderLeft =
          "2px solid var(--primary-color) !important";
      }
    },
    onDragLeave: (e) => {
      e.stopPropagation();
      if (accept) {
        e.currentTarget.style.borderLeft = "2px solid var(--bg-color)";
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
        e.currentTarget.style.borderLeft = "2px solid var(--bg-color)";
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
        e.currentTarget.style.borderLeft = "2px solid var(--bg-color)";
      }
    },
  });
  return (
    <div style={{ position: "relative" }}>
      {Element}
      {selected && accept && (
        <div className="drag-item-extra">
          <i
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path
                d="M5 11L10.5 11M10.5 11L10.5 40C10.5 40.5523 10.9477 41 11.5 41L36.5 41C37.0523 41 37.5 40.5523 37.5 40V11M10.5 11L16 11M37.5 11L43 11M37.5 11L32 11M16 11V7L32 7V11M16 11L32 11"
                strokeLinecap="butt"
              ></path>
              <path d="M20 18V33M28 18V33" strokeLinecap="butt"></path>
            </svg>
          </i>
          <i
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path
                d="M20 6H38C39.1046 6 40 6.89543 40 8V30M8 16V40C8 41.1046 8.89095 42 9.99552 42H30.0026C31.1072 42 32 41.1131 32 40.0085V15.9968C32 14.8922 31.1046 14 30 14H10C8.89543 14 8 14.8954 8 16Z"
                strokeLinecap="butt"
              ></path>
            </svg>
          </i>
        </div>
      )}
    </div>
  );
};
