import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/primitives/PageHeader";
import { SectionCard } from "@/components/primitives/SectionCard";
import { SingleUploadForm } from "@/components/upload/SingleUploadForm";
import { dur, easeOut } from "@/lib/motion";

export const Route = createFileRoute("/_app/upload")({
  head: () => ({ meta: [{ title: "Одиночная публикация — Draxler" }] }),
  component: UploadPage,
});

function UploadPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dur.base, ease: easeOut }}
    >
      <PageHeader
        eyebrow="Контент"
        title="Одиночная публикация"
        description="Загрузите изображения, выберите категорию и добавьте теги. Карточка отправится в очередь публикации."
      />
      <SectionCard>
        <SingleUploadForm />
      </SectionCard>
    </motion.div>
  );
}
