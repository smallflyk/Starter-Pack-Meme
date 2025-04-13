import { StarterPackItem } from '.';

declare module './ItemControl' {
  interface ItemControlProps {
    index: number;
    item: StarterPackItem;
    onImageChange: (file: File) => void;
    onCaptionChange: (text: string) => void;
  }

  const ItemControl: React.FC<ItemControlProps>;
  export default ItemControl;
} 