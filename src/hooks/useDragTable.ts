import { ObjectKeysString } from '@Types/application.types';
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  useDrag,
  useDrop,
} from 'react-dnd';
import { useEffect } from 'react';

type Props<T = ObjectKeysString> = {
  tableIsDraggable: boolean;
  acceptType: string;
  currentItem: T;
  selectedItems: T[];
  keyTable: string;
};

type Return = {
  collectedDrop: { isOver: boolean; canDrop: boolean };
  collectedDrag: { isDragging: boolean };
  dropRef: ConnectDropTarget;
  dragRef: ConnectDragSource;
  previewRef: ConnectDragPreview;
};

const useDragTable = (setting: Props): Return => {
  const { acceptType, keyTable, currentItem, selectedItems, tableIsDraggable } = setting;

  const [collectedDrop, dropRef] = useDrop({
    accept: acceptType,
    drop: (draggingItems) => {
      return {
        focusItem: currentItem,
        draggingItems,
      };
    },
    canDrop: (draggingItems: ObjectKeysString[]) => {
      const equalsId = draggingItems.some(
        (currentIterableItem) => currentIterableItem[keyTable] === currentItem[keyTable]
      );
      const equalsParentId = draggingItems.some(
        (currentIterableItem) => currentIterableItem.parentId === currentItem[keyTable]
      );
      if (equalsId) {
        return false;
      } else return equalsParentId;
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [collectedDrag, dragRef, previewRef] = useDrag({
    type: acceptType,
    item: selectedItems.length ? selectedItems : [...selectedItems, currentItem],
    canDrag: () => tableIsDraggable,
    end: (dataDrag, monitor) => {
      const result = monitor.getDropResult();
      if (result) {
        console.log(result);
      }
    },
    collect: (monitor) => ({
      isDragging:
        selectedItems.some((itemIterable) => itemIterable[keyTable] === currentItem[keyTable]) ||
        monitor.isDragging(),
    }),
  });

  useEffect(() => {}, [currentItem, selectedItems]);

  return {
    collectedDrag,
    collectedDrop,
    dropRef,
    dragRef,
    previewRef,
  };
};

export default useDragTable;
