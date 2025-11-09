import { Controller, useFormContext } from "react-hook-form";
import Input from "../../../../components/atoms/Input";
import RadioGroup, {
  RadioGroupItem,
} from "../../../../components/molecules/RadioGroup";
import type { EditUserFormData } from "./schema";

function EditUserForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditUserFormData>();

  return (
    <div className="w-[416px] space-y-6">
      <Input
        type="text"
        placeholder="Nome"
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password?.message}
      />

      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <RadioGroup className="gap-6" onValueChange={field.onChange} value={field.value}>
            <RadioGroupItem value="ADMIN">
              <p>Admin</p>
            </RadioGroupItem>
            <RadioGroupItem value="WAITER">
              <p>Waiter</p>
            </RadioGroupItem>
          </RadioGroup>
        )}
      />
    </div>
  );
}

export default EditUserForm;
