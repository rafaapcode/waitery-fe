import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "../../../app/hooks/useAuth";
import { LoginService } from "../../../app/service/login/loginService";

const registerSchema = z.object({
  name: z.string().nonempty({error:  'O nome é obrigatório'}).min(4, 'O nome deve ter no mínimo 4 caracteres'),
  cpf: z.string().nonempty({error: 'O CPF é obrigatório'}).length(11, 'O CPF deve ter 11 dígitos'),
  email: z.email({error: 'E-mail inválido'}),
  password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres')
});

type RegisterBody = z.infer<typeof registerSchema>;

export function useRegisterController() {
  const navigate = useNavigate();
  const { setUser, signIn } = useAuth();
  const [passwordVisibility, setPasswordVisibility] = useState<
    "password" | "text"
  >("password");


  const { handleSubmit: hookHandleSubmit, register, formState: {errors, isValid, isSubmitting} } = useForm<RegisterBody>({
    resolver: zodResolver(registerSchema)
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      const {access_token,  ...userdata} = await LoginService.registerUser(data);
      signIn(access_token);
      setUser(userdata);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao registrar usuário');
    }
  });

  return {
    isValid,
    passwordVisibility,
    setPasswordVisibility,
    errors,
    handleSubmit,
    register,
    isPending: isSubmitting,
  };
}
