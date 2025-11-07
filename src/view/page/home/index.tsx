import { HomeIcon, RotateCcwIcon } from "lucide-react";
import type { Order } from "../../../app/entities/Order";
import { OrderStatus } from "../../../app/entities/Order";
import Button from "../../../components/atoms/Button";
import Column from "./components/Column";
import RestartDayModal from "./components/RestartDayModal";
import { useHomeController } from "./useHomeController";

function Home() {
  const {
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
  } = useHomeController();

  const waitingOrders: Order[] = [
    {
      id: "1",
      org_id: "org-123",
      status: OrderStatus.WAITING,
      created_at: new Date("2025-11-06T10:30:00"),
      total_price: 45.90,
      quantity: 3,
      table: "Mesa 10",
      products: [
        {
          name: "Pizza Margherita",
          quantity: 1,
          price: 32.90,
          category: "Pizza",
          discount: false,
        },
        {
          name: "Refrigerante",
          quantity: 2,
          price: 6.50,
          category: "Bebidas",
          discount: true,
        },
      ],
    },
    {
      id: "2",
      org_id: "org-123",
      status: OrderStatus.WAITING,
      created_at: new Date("2025-11-06T10:45:00"),
      total_price: 28.50,
      quantity: 2,
      table: "Mesa 5",
      products: [
        {
          name: "Hambúrguer Clássico",
          quantity: 1,
          price: 22.00,
          category: "Lanches",
          discount: false,
        },
        {
          name: "Batata Frita",
          quantity: 1,
          price: 6.50,
          category: "Acompanhamentos",
          discount: false,
        },
      ],
    },
  ];

  const inProductionOrders: Order[] = [
    {
      id: "3",
      org_id: "org-123",
      status: OrderStatus.IN_PRODUCTION,
      created_at: new Date("2025-11-06T10:15:00"),
      total_price: 67.80,
      quantity: 4,
      table: "Mesa 11",
      products: [
        {
          name: "Lasanha à Bolonhesa",
          quantity: 2,
          price: 28.90,
          category: "Massas",
          discount: false,
        },
        {
          name: "Suco Natural",
          quantity: 2,
          price: 5.00,
          category: "Bebidas",
          discount: false,
        },
      ],
    },
  ];

  const doneOrders: Order[] = [
    {
      id: "4",
      org_id: "org-123",
      status: OrderStatus.DONE,
      created_at: new Date("2025-11-06T09:50:00"),
      total_price: 89.70,
      quantity: 5,
      table: "Mesa 12",
      products: [
        {
          name: "Picanha na Chapa",
          quantity: 1,
          price: 65.00,
          category: "Carnes",
          discount: false,
        },
        {
          name: "Arroz",
          quantity: 1,
          price: 8.00,
          category: "Acompanhamentos",
          discount: false,
        },
        {
          name: "Feijão",
          quantity: 1,
          price: 6.00,
          category: "Acompanhamentos",
          discount: false,
        },
        {
          name: "Salada",
          quantity: 1,
          price: 5.70,
          category: "Acompanhamentos",
          discount: false,
        },
        {
          name: "Cerveja",
          quantity: 1,
          price: 5.00,
          category: "Bebidas",
          discount: true,
        }
      ],
    },
    {
      id: "5",
      org_id: "org-123",
      status: OrderStatus.DONE,
      created_at: new Date("2025-11-06T09:30:00"),
      total_price: 35.00,
      quantity: 3,
      table: "Mesa 3",
      products: [
        {
          name: "Salada Caesar",
          quantity: 1,
          price: 18.00,
          category: "Saladas",
          discount: false,
        },
        {
          name: "Água Mineral",
          quantity: 2,
          price: 8.50,
          category: "Bebidas",
          discount: false,
        },
      ],
    },
  ];

  return (
    <main className="w-full h-full">
      <RestartDayModal open={isRestartModalOpen} onClose={onCloseRestartModal} />
      <header className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <HomeIcon size={32} className="text-gray-600" />
            <h1 className="text-2xl font-semibold">Home</h1>
          </span>
          <p className="text-gray-400">Acompanhe os pedidos dos clientes</p>
        </div>
        <Button variant="secondary" size="sm" onClick={onOpenRestartModal}>
          <RotateCcwIcon size={20} />
          Reiniciar Dia
        </Button>
      </header>

      <section className="flex w-full mt-6 h-[500px] gap-6">
        <Column icon="🕛" name="Fila de Espera" orders={waitingOrders}/>
        <Column icon="🧑‍🍳" name="Em Produção" orders={inProductionOrders}/>
        <Column icon="✅" name="Pronto" orders={doneOrders}/>
      </section>
    </main>
  );
}

export default Home;
