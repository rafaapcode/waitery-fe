import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { User } from "../../../app/entities/User";
import { createUserForm, type CreateUserFormData } from "./schemas/createUserSchema";
import { editUserFormSchema, type EditUserFormData } from "./schemas/editUserSchema";

export function useUsersController(user?: User) {
  // Create User Modal State
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  
  // Edit User Modal State
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
  
  // Confirm Delete Modal State
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  // Create User Form
  const formCreateUser = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserForm),
    mode: "onChange",
  });

  // Edit User Form
  const formEditUser = useForm<EditUserFormData>({
    resolver: zodResolver(editUserFormSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role:
        user?.role === "ADMIN" || user?.role === "WAITER"
          ? user.role
          : "WAITER",
    },
  });

  // Create User Modal Handlers
  const onOpenCreateUserModal = () => setCreateUserModalOpen(true);
  const onCloseCreateUserModal = () => {
    setCreateUserModalOpen(false);
    formCreateUser.reset();
  }

  // Edit User Modal Handlers
  const onOpenEditUserModal = () => setIsOpenEditUserModal(true);
  const onCloseEditUserModal = () => {
    setIsOpenEditUserModal(false);
    formEditUser.reset();
  };

  // Confirm Delete Modal Handlers
  const onOpenConfirmModal = () => setIsOpenConfirmModal(true);
  const onCloseconfirmModal = () => setIsOpenConfirmModal(false);

  return {
    // Create User
    createUserModalOpen,
    onOpenCreateUserModal,
    onCloseCreateUserModal,
    formCreateUser,

    // Edit User
    isOpenEditUserModal,
    onOpenEditUserModal,
    onCloseEditUserModal,
    formEditUser,

    // Delete User
    isOpenConfirmModal,
    onOpenConfirmModal,
    onCloseconfirmModal,
  };
}