import { useState } from "react";
import { useOrgs } from "../../../../app/hooks/queries/useOrgs";
import { useAuth } from "../../../../app/hooks/useAuth";

export const useNotFoundOrgController = () => {
  const { setOrg } = useAuth();
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [createNewOrg, setCreateNewOrg] = useState(false);

  const {
    orgs,
    isFetching: fetchingOrgs,
  } = useOrgs({});

  const toggleHandleCreateNew = () => {
    setCreateNewOrg(p => !p);
  };

  const handleSelectOrganization = (e: string) => {
    setSelectedOrganization(e);
  };

  const continueWithOrg = () => {
    const orgSelected = orgs?.find(d => d.id === selectedOrganization);
    setOrg({
      orgId: selectedOrganization,
      imgUrl: orgSelected?.image_url || '',
      name: orgSelected?.name || ''
    })
  };

  return {
    orgs,
    fetchingOrgs,
    toggleHandleCreateNew,
    createNewOrg,
    handleSelectOrganization,
    continueWithOrg,
    selectedOrganization
  }
};