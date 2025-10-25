import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import { useRegisterController } from "./useRegisterController";

function RegisterPage() {
  const {
    passwordVisibility,
    setPasswordVisibility,
    isValid,
    handleSubmit,
    register,
    errors,
    isPending,
  } = useRegisterController();

  return (
    <main className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10">
        <div className="text-center">
          <p className="text-[#333333] text-base font-semibold leading-10">
            Bem-vindo(a) ao
          </p>
          <p className="text-[#333333] text-[32px]">
            <span className="font-bold">WAITERY</span>APP
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-[384px] h-fit">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Nome"
                {...register("name")}
                error={errors.name?.message}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Input
                type="email"
                placeholder="E-mail"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Cpf"
                {...register("cpf")}
                error={errors.cpf?.message}
              />
            </div>
            <div className="w-full flex flex-col gap-2  relative">
              <Input
                type={passwordVisibility}
                placeholder="Senha"
                {...register("password")}
                error={errors.password?.message}
              />
              {passwordVisibility === "password" && (
                <Eye
                  onClick={() => setPasswordVisibility("text")}
                  size={24}
                  className="cursor-pointer text-[#666666] absolute bottom-3 right-4"
                />
              )}
              {passwordVisibility === "text" && (
                <EyeOff
                  onClick={() => setPasswordVisibility("password")}
                  size={24}
                  className="cursor-pointer text-[#666666] absolute bottom-3 right-4"
                />
              )}
            </div>
            <Button
              isLoading={isPending}
              disabled={!isValid || isPending}
              type="submit"
            >
              Registrar
            </Button>
          </div>
        </form>
        <Link to={"/signin"} className="mx-auto hover:text-red-700 transition-all duration-150">Já possuo uma conta</Link>
      </div>
    </main>
  );
}

export default RegisterPage;
