import { useState } from "react";
import type { User } from "../../../app/entities/User";

export function useUsersController(user?: User) {
  // Create User Modal State
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  
  // Edit User Modal State
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
  
  // Confirm Delete Modal State
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  // Create User Modal Handlers
  const onOpenCreateUserModal = () => setCreateUserModalOpen(true);
  const onCloseCreateUserModal = () => {
    setCreateUserModalOpen(false);
  }

  // Edit User Modal Handlers
  const onOpenEditUserModal = () => setIsOpenEditUserModal(true);
  const onCloseEditUserModal = () => {
    setIsOpenEditUserModal(false);
  };

  // Confirm Delete Modal Handlers
  const onOpenConfirmModal = () => setIsOpenConfirmModal(true);
  const onCloseconfirmModal = () => setIsOpenConfirmModal(false);

  return {
    // Create User
    createUserModalOpen,
    onOpenCreateUserModal,
    onCloseCreateUserModal,

    // Edit User
    isOpenEditUserModal,
    onOpenEditUserModal,
    onCloseEditUserModal,

    // Delete User
    isOpenConfirmModal,
    onOpenConfirmModal,
    onCloseconfirmModal,
  };
}