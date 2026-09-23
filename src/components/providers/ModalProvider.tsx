"use client";
import DeleteAllModal from "@/components/modals/DeleteAllModal";
import DeleteModal from "@/components/modals/DeleteModal";
import StreamDetailsModal from "@/components/modals/StreamDetailsModal";
import StreamFormModal from "@/components/modals/StreamFormModal";

export default function ModalProvider() {
  return (
    <>
      <StreamFormModal />
      <StreamDetailsModal />
      <DeleteAllModal />
      <DeleteModal />
    </>
  );
}
