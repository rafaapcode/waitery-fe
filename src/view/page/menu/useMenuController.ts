import { useState } from "react";
import { useCategories } from "../../../app/hooks/queries/useCategories";

export function useMenuController() {
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);

  const categories = useCategories({});

  const toggleNewCategoryModal = () => {
    setNewCategoryModalOpen((prev) => !prev);
  };

  const toggleNewProductModal = () => {
    setNewProductModalOpen((prev) => !prev);
  };

  return {
    categories,
    newCategoryModalOpen,
    toggleNewCategoryModal,
    newProductModalOpen,
    toggleNewProductModal,
  };
}
