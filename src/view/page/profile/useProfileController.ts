import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../app/hooks/useAuth";
import {
  editProfileFormSchema,
  type EditProfileFormData,
} from "./schemas/editProfileSchema";

export const useProfileController = () => {
  const { user } = useAuth();

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      image: undefined,
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      new_password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return {
    form,
    onSubmit,
  };
};
