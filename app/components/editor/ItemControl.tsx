"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { StarterPackItem } from '@/app/types';

interface ItemControlProps {
  index: number;
  item: StarterPackItem;
  onImageChange: (file: File) => void;
  onCaptionChange: (text: string) => void;
}

const ItemControl: React.FC<ItemControlProps> = ({
  index,
  item,
  onImageChange,
  onCaptionChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="border rounded-md p-3 bg-gray-50">
      <div className="flex items-center mb-2">
        <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2">
          {index + 1}
        </span>
        <span className="text-sm font-medium">Item {index + 1}</span>
      </div>
      
      <div className="space-y-3">
        {/* Image upload */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleFileSelect}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {item.imageUrl ? 'Change Image' : 'Upload Image'}
          </button>
          
          {item.imageUrl && (
            <div className="mt-2 relative h-20 rounded-md overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={`Item ${index + 1}`}
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
            </div>
          )}
        </div>
        
        {/* Text description */}
        <div>
          <input
            type="text"
            value={item.caption}
            onChange={(e) => onCaptionChange(e.target.value)}
            placeholder="Add text description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemControl; 