import DeleteAllModal from "@/components/modals/DeleteAllModal";
import AddStreamModal from "@/components/modals/StreamFormModal";

export default function ModalProvider() {
  return (
    <>
      <AddStreamModal />
      <DeleteAllModal />
    </>
  );
}
