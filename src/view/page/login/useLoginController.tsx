import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "../../../app/hooks/useAuth";
import { LoginService } from "../../../app/service/login/loginService";
import { Service } from "../../../app/service/service";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres')
});

type LoginBody = z.infer<typeof loginSchema>;

export function useLoginController() {
  const navigate = useNavigate();
  const { setUser, signIn } = useAuth();
  const [passwordVisibility, setPasswordVisibility] = useState<
    "password" | "text"
  >("password");


  const { handleSubmit: hookHandleSubmit, register, formState: {errors, isValid, isSubmitting} } = useForm<LoginBody>({
    resolver: zodResolver(loginSchema)
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      const user = await LoginService.loginUser(data);
      Service.SetAccessToken(user.access_token);
      signIn(user.access_token);
      setUser(user);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao realizar o login');
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
