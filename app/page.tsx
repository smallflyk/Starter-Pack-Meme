import React from 'react';
import Link from 'next/link';
import { categories } from './data/categories';
import Navbar from './components/ui/Navbar';
import CategoryCard from './components/ui/CategoryCard';
import Button from './components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            Starter Pack Meme Generator
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Choose a template and create your own Starter Pack meme in seconds
          </p>
          <div className="mt-8">
            <Link href="/editor">
              <Button size="lg" variant="primary">Start Creating Now</Button>
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Templates</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  1
                </span>
              </div>
              <h3 className="text-center text-lg font-medium text-gray-900">Choose a Template</h3>
              <p className="mt-2 text-center text-gray-500">
                Select from our curated templates or start from scratch
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  2
                </span>
              </div>
              <h3 className="text-center text-lg font-medium text-gray-900">Customize Content</h3>
              <p className="mt-2 text-center text-gray-500">
                Upload images, edit text, and adjust layouts
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  3
                </span>
              </div>
              <h3 className="text-center text-lg font-medium text-gray-900">Share Your Creation</h3>
              <p className="mt-2 text-center text-gray-500">
                Download your Starter Pack image or get a share link
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; 2023 Starter Pack Meme Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
