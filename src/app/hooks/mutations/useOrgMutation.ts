import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { OrgService } from "../../service/org/orgService";
import { useRevalidateOrg } from "../revalidates/useRevalidateOrg";

interface UseOrgMutationProps {
  onClose: () => void;
}

export function useOrgMutation({ onClose }: UseOrgMutationProps) {
  const { revalidateOrgs } = useRevalidateOrg();
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: OrgService.CreateOrgParams) => OrgService.createOrg(data),
    onSuccess: () => {
      revalidateOrgs();
      onClose();
      toast.success("Organização criada com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao criar organização");
    },
  })

  return { createOrg: mutateAsync, isPending };
}