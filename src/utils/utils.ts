import type { IngredientsTab } from "../types/types";

export const ingredientsTabs: IngredientsTab[] = [
  { id: 1, title: "Булки", type: "bun" },
  { id: 2, title: "Соусы", type: "sauce" },
  { id: 3, title: "Начинки", type: "main" },
];

export const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  const time = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) {
    return `Сегодня, ${time}`;
  }

  if (diffDays === 1) {
    return `Вчера, ${time}`;
  }

  const fullDate = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  return `${fullDate}, ${time}`;
};
