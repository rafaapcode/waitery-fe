import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import SelectComponent, {
  type SelectInstance,
  type SingleValue,
} from "react-select";
import { Image } from "../../../components/atoms/Image";

type Option = {
  label: string;
  value: string;
};

interface SelectOrgProps {
  isLoading?: boolean;
  orgId?: string;
  isOpen?: boolean;
  orgImageUrl?: string;
  selectOrg: (id: string) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  organizations?: Option[] | undefined;
}

function SelectOrg({
  orgId,
  isOpen,
  selectOrg,
  orgImageUrl,
  organizations,
  isLoading,
  setIsOpen,
}: SelectOrgProps) {
  const [showClosedMenu, setShowClosedMenu] = useState(false);
  const selectRef = useRef<SelectInstance<Option> | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setShowClosedMenu(false);
    }
    if (showClosedMenu) {
      selectRef.current?.focus();
    }

    return () => {
      setShowClosedMenu(false);
    };
  }, [showClosedMenu, isOpen]);

  function handleSelectOption(option: SingleValue<Option>) {
    selectOrg(option?.value || "");
    setShowClosedMenu(false);
  }

  return (
    <>
      {!isOpen && !showClosedMenu && (
        <button
          type="button"
          className="w-full flex justify-center items-center cursor-pointer"
          onClick={() => {
            setShowClosedMenu(true);
            setIsOpen(true);
          }}
        >
          <Image src={orgImageUrl} className="size-full" shape="square" />
        </button>
      )}

      {!isOpen && showClosedMenu && (
        <SelectComponent
          ref={selectRef}
          id="select-an-org"
          placeholder="Selecione uma organização"
          options={organizations}
          isLoading={isLoading}
          loadingMessage={() => "Carregando organizações..."}
          onChange={handleSelectOption}
          onMenuClose={() => setShowClosedMenu(false)}
          menuIsOpen
          value={
            organizations?.find(
              (organization) => organization.value === orgId,
            ) ?? null
          }
        />
      )}

      {isOpen && (
        <SelectComponent
          id="select-an-org"
          placeholder="Selecione uma organização"
          options={organizations}
          isLoading={isLoading}
          loadingMessage={() => "Carregando organizações..."}
          onChange={handleSelectOption}
          value={
            organizations?.find(
              (organization) => organization.value === orgId,
            ) ?? null
          }
        />
      )}
    </>
  );
}

export default SelectOrg;
