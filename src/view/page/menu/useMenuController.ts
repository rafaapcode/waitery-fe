import { useState } from "react";
import { useCategories } from "../../../app/hooks/queries/useCategories";
import { useProducts } from "../../../app/hooks/queries/useProducts";

export function useMenuController() {
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);

  const categories = useCategories({});

  const products = useProducts({});

  const toggleNewCategoryModal = () => {
    setNewCategoryModalOpen((prev) => !prev);
  };

  const toggleNewProductModal = () => {
    setNewProductModalOpen((prev) => !prev);
  };

  return {
    categories,
    products,
    newCategoryModalOpen,
    toggleNewCategoryModal,
    newProductModalOpen,
    toggleNewProductModal,
  };
}
