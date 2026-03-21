import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./SortableItem.module.scss";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../../services/store/hooks";
import { SORT_INGREDIENTS } from "../../../../shared/constants";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  id: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  testId: string;
  children: React.ReactNode;
};

function SortableItem({ id, moveItem, testId, children }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  const { ingredientsSelected } = useAppSelector(
    (store) => store.ingredientsSelected,
  );
  const isMobile = useMediaQuery("(max-width: 640px)");

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
    if (!ref.current) return;

    drag(drop(ref.current));
  }, [drag, drop]);

  useEffect(() => {
    const element = ref.current;
    if (!isMobile || !element) return;

    const handleMouseEnterEvent = (e: MouseEvent) => {
      const deleteIcon = element.querySelector<HTMLElement>(
        ".constructor-element__action",
      );
      const priceIcon = element.querySelector<HTMLElement>(
        ".constructor-element__price svg",
      );
      if (!deleteIcon || !priceIcon) return;

      deleteIcon.classList.add("visible");
      priceIcon.classList.add("hidden");
    };

    const handleMouseLeaveEvent = (e: MouseEvent) => {
      const deleteIcon = element.querySelector<HTMLElement>(
        ".constructor-element__action",
      );
      const priceIcon = element.querySelector<HTMLElement>(
        ".constructor-element__price svg",
      );
      if (!deleteIcon || !priceIcon) return;

      deleteIcon.classList.remove("visible");
      priceIcon.classList.remove("hidden");
    };

    element.addEventListener("mouseenter", handleMouseEnterEvent);
    element.addEventListener("mouseleave", handleMouseLeaveEvent);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnterEvent);
      element.removeEventListener("mouseleave", handleMouseLeaveEvent);
    };
  }, [isMobile]);

  return (
    <li
      ref={ref}
      className={styles.item}
      style={{ opacity }}
      data-testid={testId}
    >
      <span className={styles.dragHandle}>
        <DragIcon type="primary" />
      </span>
      {children}
    </li>
  );
}

export default SortableItem;
