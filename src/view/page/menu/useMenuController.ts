import { useEffect, useState } from "react";
import { useCategories } from "../../../app/hooks/queries/useCategories";

export function useMenuController() {
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'PRODUTOS' | 'CATEGORIA'>('PRODUTOS');

  const categories = useCategories({enabled: false});

  useEffect(() => {
    if(selectedTab === 'CATEGORIA') {
      categories.loadCategories();
    } else {
      console.log('Selected Tab:', selectedTab);
    }
  }, [selectedTab])

  const toggleNewCategoryModal = () => {
    setNewCategoryModalOpen((prev) => !prev);
  };

  const toggleNewProductModal = () => {
    setNewProductModalOpen((prev) => !prev);
  };

  return {
    categories,
    setSelectedTab,
    newCategoryModalOpen,
    toggleNewCategoryModal,
    newProductModalOpen,
    toggleNewProductModal,
  };
}
