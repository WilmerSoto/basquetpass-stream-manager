import Header from "@/components/dashboard/Header";
import StreamGrid from "@/components/dashboard/StreamGrid";
import ModalProvider from "@/components/providers/ModalProvider";

export default function Home() {
  return (
    <main>
      <Header />
      <StreamGrid />
      <ModalProvider />
    </main>
  );
}
