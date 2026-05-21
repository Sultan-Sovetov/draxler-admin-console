import { supabase, type ProductInsert, type ProductImage } from "./supabase";

export interface PublishProductInput extends ProductInsert {
  files?: File[];
}

export async function publishProduct(
  input: PublishProductInput,
  files: File[],
  onProgress?: (msg: string) => void,
) {
  onProgress?.("Создание записи в БД...");
  
  const { files: _, ...dbPayload } = input;

  const { data: product, error: insertError } = await supabase
    .from("products")
    .insert(dbPayload)
    .select()
    .single();

  if (insertError) throw new Error(`Ошибка создания продукта: ${insertError.message}`);
  if (!product) throw new Error("Продукт не создан");

  const productId = product.id;

  if (files.length > 0) {
    onProgress?.("Загрузка изображений...");
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}-${Date.now()}-${i}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw new Error(`Ошибка загрузки фото: ${uploadError.message}`);

      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      const imageRecord: Omit<ProductImage, "id" | "created_at"> = {
        product_id: productId,
        image_url: publicUrl,
      };

      await supabase.from("product_images").insert(imageRecord);
    }
  }

  onProgress?.("Готово!");
  return product;
}

export function toProductInsert(item: any): ProductInsert {
  return {
    title: item.title,
    type: item.category,
    parameters: JSON.stringify({ tags: item.tags }),
    sizes: item.sizes,
    section_1_title: item.section_1_title,
    section_1_text: item.section_1_text,
    section_2_title: item.section_2_title,
    section_2_text: item.section_2_text,
    section_3_title: item.section_3_title,
    section_3_text: item.section_3_text,
    section_4_title: item.section_4_title,
    section_4_text: item.section_4_text,
    section_5_title: item.section_5_title,
    section_5_text: item.section_5_text,
  };
}
