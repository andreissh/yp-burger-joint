import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./SortableItem.module.scss";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../services/hooks";
import { SORT_INGREDIENTS } from "../../../shared/constants";

type Props = {
  id: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
};

function SortableItem({ id, moveItem, children }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  const { data: ingredientsSelected } = useAppSelector(
    (store) => store.ingredientsSelected,
  );

  const [, drop] = useDrop({
    accept: SORT_INGREDIENTS,
    hover(item: { id: string }) {
      if (!ref.current) return;

      const dragIndex = ingredientsSelected.findIndex(
        (i) => i.uuid === item.id,
      );
      const hoverIndex = ingredientsSelected.findIndex((i) => i.uuid === id);

      if (dragIndex === hoverIndex) return;

      moveItem(dragIndex, hoverIndex);
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: SORT_INGREDIENTS,
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(drop(ref.current));
    }
  }, [drag, drop]);

  return (
    <li ref={ref} className={styles.item} style={{ opacity }}>
      <span className={styles.dragHandle}>
        <DragIcon type="primary" />
      </span>
      {children}
    </li>
  );
}

export default SortableItem;
