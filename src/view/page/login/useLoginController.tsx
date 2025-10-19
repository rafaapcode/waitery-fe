import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "../../../app/hooks/useAuth";
import { LoginService } from "../../../app/service/login/loginService";

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


  const { handleSubmit: hookHandleSubmit, register, formState: {errors, isValid} } = useForm<LoginBody>({
    resolver: zodResolver(loginSchema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: LoginBody) => {
      return await LoginService.loginUser(data);
    }
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      const user = await mutateAsync(data);
      console.log(user);
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
    isPending,
  };
}
