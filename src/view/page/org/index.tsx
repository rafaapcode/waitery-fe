import { LoaderCircle } from "lucide-react";
import { useOrg } from "../../../app/hooks/queries/useOrg";
import EditOrgForm from "./EditOrgForm";

function Org() {
  const { org, isFetching } = useOrg({});

  return (
    <div className="w-full h-full overflow-hidden">
      {!org && <div className="w-full h-full flex justify-center items-center"><LoaderCircle size={46} className="text-red-700 animate-spin"/></div>}
      {org && <EditOrgForm org={org} isFetching={isFetching} />}
    </div>
  );
}

export default Org;
