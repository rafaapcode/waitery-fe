import { Controller } from "react-hook-form";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import ImageInput from "../../../components/molecules/ImageInput";
import { useProfileController } from "./useProfileController";

function Profile() {
  const { form, onSubmit } = useProfileController();

  const {
    register,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

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
            {...register("password")}
            type="password"
            placeholder="Senha Atual"
            placeholderText="Digite a senha atual"
            error={errors.password?.message}
          />
        </div>
        <div className="w-full flex gap-4">
          <Input
            {...register("new_password")}
            type="password"
            placeholder="Nova Senha"
            placeholderText="Digite a nova senha"
            error={errors.new_password?.message}
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

export default Profile;
