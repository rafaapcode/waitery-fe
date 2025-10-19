import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useNotFoundOrgController = () => {
  // const {user, setOrg} = useAuth();
  const navigate = useNavigate();
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");

  // const {
  //   fetchingOrgs,
  //   gettingOrgs,
  //   orgs
  // } = useListOrgs(user.id);

  const handleCreateNew = () => {
    navigate("/org/register");
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
    handleCreateNew,
    handleSelectOrganization,
    continueWithOrg,
    selectedOrganization
  }
};