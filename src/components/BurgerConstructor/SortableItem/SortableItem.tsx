import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./SortableItem.module.scss";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../services/hooks";

type Props = {
  id: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
};

const ItemType = "INGREDIENT";

function SortableItem({ id, moveItem, children }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  const { data: activeOrder } = useAppSelector(
    (store) => store.ingredientsOrder,
  );

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { id: string }) {
      if (!ref.current) return;

      const dragIndex = activeOrder.findIndex((i) => i.uuid === item.id);
      const hoverIndex = activeOrder.findIndex((i) => i.uuid === id);

      if (dragIndex === hoverIndex) return;

      moveItem(dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(drop(ref.current));
    }
  }, [drag, drop]);

  return (
    <li
      ref={ref}
      className={styles.item}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className={styles.dragHandle}>
        <DragIcon type="primary" />
      </span>
      {children}
    </li>
  );
}

export default SortableItem;
