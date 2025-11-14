import { useState } from "react";

export const useNotFoundOrgController = () => {
  // const {user, setOrg} = useAuth();
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [createNewOrg, setCreateNewOrg] = useState(false);

  // const {
  //   fetchingOrgs,
  //   gettingOrgs,
  //   orgs
  // } = useListOrgs(user.id);

  const toggleHandleCreateNew = () => {
    setCreateNewOrg(p => !p);
  };

  const handleSelectOrganization = (e: string) => {
    setSelectedOrganization(e);
  };

  const continueWithOrg = () => {
    // const orgSelected = orgs?.find(d => d._id === selectedOrganization);
    // setOrg({
    //   orgId: selectedOrganization,
    //   imgUrl: orgSelected?.imageUrl || '',
    //   name: orgSelected?.name || ''
    // })
  };

  return {
    // orgs,
    // gettingOrgs,
    // fetchingOrgs,
    toggleHandleCreateNew,
    createNewOrg,
    handleSelectOrganization,
    continueWithOrg,
    selectedOrganization
  }
};