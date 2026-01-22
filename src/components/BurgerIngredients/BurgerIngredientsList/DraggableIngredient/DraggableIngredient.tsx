import { useDrag } from "react-dnd";
import styles from "./DraggableIngredient.module.scss";
import type { Ingredient } from "../../../../types/types";
import { DND_INGREDIENT } from "../../../../shared/constants";

type Props = {
  ingredient: Ingredient;
  children: React.ReactNode;
  onIngredientClick: (arg: Ingredient) => void;
};

const DraggableIngredient = ({
  ingredient,
  onIngredientClick,
  children,
}: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={styles.productTypeItem}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => onIngredientClick(ingredient)}
    >
      {children}
    </li>
  );
};

export default DraggableIngredient;
