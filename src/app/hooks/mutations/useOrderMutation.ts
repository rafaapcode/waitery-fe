import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { OrderService } from "../../service/order/orderService";
import { useRevalidateTodayOrders } from "../revalidates/useRevalidateOrders";

export function useUpdateOrderMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: {
      status: OrderService.UpdateOrdersStatusOutput["status"];
      orderId: string;
    }) =>
      OrderService.updateOrderStatus({ id: data.orderId, status: data.status }),
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao atualizar pedido");
    },
  });

  return { updateOrder: mutateAsync, isPending };
}

interface UseDeleteOrderMutationProps {
  onClose: () => void;
  revalidate?: () => void;
}

export function useDeleteOrderMutation({
  onClose,
  revalidate,
}: UseDeleteOrderMutationProps) {
  const { revalidateOrders } = useRevalidateTodayOrders();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => OrderService.deleteOrder(id),
    onSuccess: () => {
      if (revalidate) {
        revalidate();
      } else {
        revalidateOrders();
      }
      onClose();
      toast.success("Pedido excluído com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir pedido");
    },
  });

  return { deleteOrder: mutateAsync, isPending };
}

interface UseCancelOrderMutationProps {
  onClose: () => void;
}

export function useCancelOrderMutation({
  onClose,
}: UseCancelOrderMutationProps) {
  const { revalidateOrders } = useRevalidateTodayOrders();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => OrderService.cancelOrder(id),
    onSuccess: () => {
      revalidateOrders();
      onClose();
      toast.success("Pedido cancelado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao cancelar pedido");
    },
  });

  return { cancelOrder: mutateAsync, isPending };
}

interface UseRestartOrderMutationProps {
  onClose: () => void;
}

export function useRestartOrderMutation({
  onClose,
}: UseRestartOrderMutationProps) {
  const { revalidateOrders } = useRevalidateTodayOrders();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => OrderService.restartOrdersOfDay(),
    onSuccess: () => {
      revalidateOrders();
      onClose();
      toast.success("Dia reinicializado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao reinicializar o dia");
    },
  });

  return { restartOrders: mutateAsync, isPending };
}
