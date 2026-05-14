import { X } from "lucide-react";

interface ImageThumbStripProps {
  images: string[];
  onRemove?: (index: number) => void;
}

export function ImageThumbStrip({ images, onRemove }: ImageThumbStripProps) {
  if (images.length === 0) return null;
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1 py-1">
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-[2px] overflow-hidden bg-muted group"
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label="Удалить изображение"
              className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-background/95 text-foreground inline-flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity shadow-elevated"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2.2} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
