import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../app/lib/utils";
import DefaultImage from "../../assets/images/default-image.png";

const imageVariants = cva(
  ["rounded-md transition-all duration-200 object-cover"],
  {
    variants: {
      size: {
        xs: "w-12",
        sm: "w-20",
        md: "w-32",
        lg: "w-48",
        xl: "w-64",
      },
      shape: {
        rectangle: "",
        square: "aspect-square",
      },
    },
    compoundVariants: [
      { size: "xs", shape: "rectangle", class: "h-10" },
      { size: "sm", shape: "rectangle", class: "h-16" },
      { size: "md", shape: "rectangle", class: "h-28" },
      { size: "lg", shape: "rectangle", class: "h-40" },
      { size: "xl", shape: "rectangle", class: "h-56" },
    ],
    defaultVariants: {
      size: "md",
      shape: "rectangle",
    },
  }
);

interface ImageProps
  extends ComponentProps<"img">,
    VariantProps<typeof imageVariants> {
  isLoading?: boolean;
  src?: string;
}

export function Image({
  isLoading,
  className,
  size,
  shape,
  src,
  ...props
}: ImageProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          imageVariants({ size, shape }),
          className,
          "bg-gray-200 animate-pulse"
        )}
      />
    );
  }

  return (
    <img
      {...props}
      src={src || DefaultImage}
      className={cn(imageVariants({ size, shape }), className)}
    />
  );
}
