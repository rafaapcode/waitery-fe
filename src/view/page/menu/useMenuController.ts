import { useState } from "react";

export function useMenuController() {
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);

  const toggleNewCategoryModal = () => {
    setNewCategoryModalOpen((prev) => !prev);
  };

  const toggleNewProductModal = () => {
    setNewProductModalOpen((prev) => !prev);
  };

  return {
    newCategoryModalOpen,
    toggleNewCategoryModal,
    newProductModalOpen,
    toggleNewProductModal,
  };
}
