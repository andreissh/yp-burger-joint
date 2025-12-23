import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./SortableItem.module.scss";

function SortableItem({ id, children }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} className={styles.item}>
      <span className={styles.dragHandle} {...attributes} {...listeners} />
      {children}
    </li>
  );
}

export default SortableItem;
