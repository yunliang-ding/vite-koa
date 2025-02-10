/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useState } from "react";
import { DragProps } from "./type";
import { uuid } from "../../shared";
import Item from "./item";
import "./index.less";

export const store: any = {}; // 全局store

export const arrayMove = (
  arr: any[],
  currentIndex: number,
  targetIndex: number
) => {
  // 拷贝下
  const temp = arr[targetIndex];
  // 删除之前的
  arr.splice(targetIndex, 1);
  // 插入到指定的下标位置
  arr.splice(currentIndex, 0, temp);
  return [...arr];
};

const Drag = ({
  items = [],
  onChange = () => {},
  onSelected = () => {},
  children,
  dragId = useMemo(() => uuid(), []), // 唯一id
  accept = true,
  defaultKey,
  selected = true,
}: DragProps) => {
  const [selectedKey, setSelectedKey] = useState<string | number | undefined>(
    defaultKey
  );
  const [list, setList] = useState(items);
  /** 指定位置插入元素 */
  const insertByIndex = (index: number, item: any) => {
    list.splice(index, 0, {
      ...item,
      key: uuid(8),
    });
    // 更新视图
    setList([...list]);
    // 通知外部
    onChange([...list]);
  };
  useEffect(() => {
    if (items) {
      store[dragId] = items; // 存进去
      return () => {
        delete store[dragId];
      };
    }
  }, [items]);
  return (
    <>
      {children
        ? children
        : list.filter(Boolean).map((item, index) => {
            return (
              <Item
                key={item.key}
                index={index}
                dragId={dragId}
                accept={accept}
                selected={selectedKey === item.key}
                onSelected={() => {
                  if (selected) {
                    setSelectedKey(item.key);
                    onSelected(item);
                  }
                }}
                onDelete={() => {
                  list.splice(index, 1);
                  // 更新视图
                  setList([...list]);
                  // 通知外部
                  onChange([...list]);
                }}
                onCopy={() => {
                  insertByIndex(index + 1, {
                    ...item,
                    key: uuid(8),
                  });
                }}
                onAdd={(item: any, index: number) => {
                  if (accept) {
                    insertByIndex(index, {
                      ...item,
                      key: uuid(8),
                    });
                  }
                }}
                onDrop={(targetIndex: number) => {
                  if (String(index) === String(targetIndex)) {
                    return;
                  }
                  const newList = arrayMove(list, index, targetIndex);
                  // 更新视图
                  setList(newList);
                  // 通知外部
                  onChange(newList);
                }}
              >
                {item?.content}
              </Item>
            );
          })}
    </>
  );
};

Drag.Item = Item;

export default Drag;
