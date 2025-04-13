"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StarterPackCategory } from '@/app/types';

interface CategoryCardProps {
  category: StarterPackCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/editor?category=${category.id}`} className="group">
      <div className="overflow-hidden rounded-lg bg-white shadow transition-all duration-200 hover:shadow-md">
        <div className="aspect-w-16 aspect-h-9 w-full relative h-48">
          <div className="relative h-full w-full bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg font-medium">
              {category.name}
            </div>
            <Image
              src={category.thumbnail}
              alt={category.name}
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              fill
              unoptimized
              onError={(e) => {
                // 隐藏加载失败的图片
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{category.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 