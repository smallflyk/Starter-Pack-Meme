"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/ui/Navbar';
import StarterPackEditor from '../components/editor/StarterPackEditor';
import { categories } from '../data/categories';
import { StarterPackItem } from '../types';

export default function EditorPage() {
  const searchParams = useSearchParams();
  const [initialTemplate, setInitialTemplate] = useState<{
    title: string;
    subtitle: string;
    items: StarterPackItem[];
  } | undefined>(undefined);
  
  useEffect(() => {
    // Process category ID parameter
    const categoryId = searchParams.get('category');
    
    // If there's a category ID, find the corresponding template
    if (categoryId) {
      const category = categories.find(cat => cat.id === categoryId);
      if (category && category.templates.length > 0) {
        // Select the first template by default
        setInitialTemplate({
          title: category.templates[0].title,
          subtitle: category.templates[0].subtitle,
          items: category.templates[0].items
        });
      }
    }
  }, [searchParams]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create your Starter Pack</h1>
          <p className="mt-2 text-gray-600">Drag images and edit text to create a unique Starter Pack</p>
        </div>
        
        <StarterPackEditor initialTemplate={initialTemplate} />
      </div>
    </div>
  );
} 