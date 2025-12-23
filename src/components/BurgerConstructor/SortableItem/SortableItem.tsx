import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./SortableItem.module.scss";

type Props = {
  id: number;
  children: React.ReactNode;
};

function SortableItem({ id, children }: Props) {
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
