import { Building } from "lucide-react";
import { Image } from "../../../components/atoms/Image";
import Select, {
  SelectContent,
  SelectTrigger,
} from "../../../components/molecules/Select";

interface SelectOrgProps {
  isLoading?: boolean;
  orgId?: string;
  isOpen?: boolean;
  orgImageUrl?: string;
  selectOrg: (id: string) => void;
  organizations?:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
}

function SelectOrg({
  orgId,
  isOpen,
  selectOrg,
  orgImageUrl,
  organizations,
  isLoading,
}: SelectOrgProps) {
  return (
    <Select defaultValue={orgId} onValueChange={selectOrg} isLoading={isLoading}>
      {!isOpen && (
        <SelectTrigger>
          <div className=" w-full flex justify-center items-center cursor-pointer">
            <Image src={orgImageUrl} className="size-full" shape="square" />
          </div>
        </SelectTrigger>
      )}

      {isOpen && (
        <SelectTrigger
          placeholder="Mude de organização"
          Icon={Building}
        />
      )}

      <SelectContent options={organizations} />
    </Select>
  );
}

export default SelectOrg;
