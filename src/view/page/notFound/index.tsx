import { useNavigate } from "react-router";
import Button from "../../../components/atoms/Button";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-7xl md:text-[200px]">404</p>
      <p className="text-2xl md:text-3xl">Página não encontrada</p>
      <Button onClick={() => navigate('/')} className="mt-10">
        Voltar
      </Button>
    </div>
  )
}

export default NotFoundPage
