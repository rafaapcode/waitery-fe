import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../../app/hooks/useAuth";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import ImageInput from "../../../components/molecules/ImageInput";
import { editProfileFormSchema, type EditProfileFormData } from "./schemas/editProfileSchema";

function Profile() {
  const { user } = useAuth();

 const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      image: undefined,
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      cpf: user?.cpf || "",
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-1/2 max-h-full mt-2 flex flex-col gap-10 items-center justify-center mx-auto overflow-y-auto">
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageInput
              label=""
              onChange={field.onChange}
              url={field.value}
              className="h-40"
            />
          )}
        />

        <div className="w-full flex gap-4">
          <Input
            {...register("name")}
            placeholder="Nome"
            placeholderText="Nome da Organização"
            error={errors.name?.message}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            placeholderText="Email da Organização"
            error={errors.email?.message}
          />
        </div>
        <div className="w-full flex gap-4">
          <Input
            {...register("cpf")}
            type="text"
            placeholder="CPF"
            placeholderText="12312312312"
            error={errors.cpf?.message}
          />
        </div>

        <div className="w-full flex justify-end items-center">
          <Button
            disabled={!isDirty || isSubmitting || !isValid}
            isLoading={isSubmitting}
            size="sm"
            onClick={onSubmit}
          >
            Atualizar Perfil
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile