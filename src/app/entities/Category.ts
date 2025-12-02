import type { OptionsType } from "../../components/molecules/DropdownMenu";

export interface Category {
  id: string;
  org_id: string;
  name: string;
  icon: string;
}

export function categoryToOptionsType(category: Category[]): OptionsType[] {
  return category.map((cat) => ({
    icon: cat.icon,
    label: cat.name,
    value: cat.id,
    type: "option",
  }));
}

export function categoryToSelectOptions(category: Category[]): {label: string; value: string;}[] {
  return category.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));
}