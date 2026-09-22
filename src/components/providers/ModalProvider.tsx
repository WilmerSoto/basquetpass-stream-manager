import DeleteAllModal from "@/components/modals/DeleteAllModal";
import DeleteModal from "@/components/modals/DeleteModal";
import AddStreamModal from "@/components/modals/StreamFormModal";

export default function ModalProvider() {
  return (
    <>
      <AddStreamModal />
      <DeleteAllModal />
      <DeleteModal />
    </>
  );
}
