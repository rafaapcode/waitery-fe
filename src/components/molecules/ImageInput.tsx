import { ImageIcon } from "lucide-react";
import { cn } from "../../app/lib/utils";
import DefaultImage from "../../assets/images/default-image.png";
import { Image } from "../atoms/Image";

interface ImageInputProps {
  url?: string | File;
  alt?: string;
  className?: string;
  label?: string;
  onChange?: (file: File) => void;
}

function ImageInput({ url, alt, className, label = "Imagem", onChange }: ImageInputProps) {
  let imageSrc = DefaultImage;
  if(url && typeof url !== 'string') {
    imageSrc = URL.createObjectURL(url);
  } else {
    imageSrc = url || DefaultImage;
  }
 

  return (
    <div>
      <span className="text-gray-600">{label}</span>
      <div className="relative rounded-md group">
        <Image
          src={imageSrc}
          alt={alt || "Imagem do produto"}
          className={cn("w-[416px] h-[160px]", className)}
        />
        <div className="absolute group-hover:flex bg-black/80 hidden bottom-0 w-full h-full rounded-md justify-center items-center gap-2 cursor-pointer">
          <ImageIcon className="text-white"/>
          <span className="text-white">Alterar imagem</span>
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => onChange && e.target.files && onChange(e.target.files[0])}/>
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
