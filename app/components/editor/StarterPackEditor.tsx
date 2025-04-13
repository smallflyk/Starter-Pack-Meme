"use client";

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StarterPackItem, EditorState } from '@/app/types';
import Button from '../ui/Button';
import ItemControl from './ItemControl';

// Client-side code only, avoid server-side execution
let fabric: any = null;

interface StarterPackEditorProps {
  initialTemplate?: {
    title: string;
    subtitle: string;
    items: StarterPackItem[];
  };
}

const StarterPackEditor: React.FC<StarterPackEditorProps> = ({ initialTemplate }) => {
  const [editorState, setEditorState] = useState<EditorState>({
    title: initialTemplate?.title || 'My Starter Pack',
    subtitle: initialTemplate?.subtitle || 'Essential Item List',
    items: initialTemplate?.items || Array(6).fill(null).map(() => ({
      id: uuidv4(),
      imageUrl: '',
      caption: ''
    })),
    background: 'white'
  });

  const canvasRef = useRef<any>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  // 动态导入fabric
  useEffect(() => {
    // 只在浏览器环境执行
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      fabric = window.fabric;
      setFabricLoaded(true);
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (canvasRef.current) {
        try {
          canvasRef.current.dispose();
        } catch (err) {
          console.error('Error disposing canvas:', err);
        }
      }
      document.body.removeChild(script);
    };
  }, []);

  // 初始化Canvas
  useEffect(() => {
    if (!fabricLoaded || !fabric || !canvasContainerRef.current) return;
    
    try {
      setTimeout(() => {
        if (!document.getElementById('meme-canvas')) {
          console.error('Canvas element not found');
          return;
        }
        
        try {
          const canvas = new fabric.Canvas('meme-canvas', {
            width: 800,
            height: 800,
            backgroundColor: editorState.background === 'white' ? '#fff' : 
                            editorState.background === 'black' ? '#000' : '#f5f5f5'
          });
          
          canvasRef.current = canvas;
          setCanvasInitialized(true);
          console.log('Canvas initialized successfully');
        } catch (error) {
          console.error('Error initializing fabric.js Canvas:', error);
        }
      }, 500);
    } catch (error) {
      console.error('Error setting up canvas:', error);
    }
  }, [fabricLoaded]);

  // 更新背景颜色
  useEffect(() => {
    if (!canvasInitialized || !canvasRef.current) return;
    
    try {
      canvasRef.current.setBackgroundColor(
        editorState.background === 'white' ? '#fff' : 
        editorState.background === 'black' ? '#000' : '#f5f5f5',
        () => canvasRef.current?.renderAll()
      );
    } catch (error) {
      console.error('Error updating background:', error);
    }
  }, [editorState.background, canvasInitialized]);

  // 处理添加图片
  const handleAddImage = (index: number, file: File) => {
    if (!file || !canvasRef.current || !canvasInitialized || !fabric) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        try {
          fabric.Image.fromURL(e.target.result.toString(), (img: any) => {
            // 调整图片大小和位置
            const maxSize = 200;
            if (img.width && img.height) {
              if (img.width > img.height) {
                if (img.width > maxSize) {
                  img.scaleToWidth(maxSize);
                }
              } else {
                if (img.height > maxSize) {
                  img.scaleToHeight(maxSize);
                }
              }
            }

            // 计算九宫格位置
            const gridSize = 3;
            const cellSize = 800 / gridSize;
            const col = index % gridSize;
            const row = Math.floor(index / gridSize);
            
            img.left = col * cellSize + cellSize / 2 - (img.getScaledWidth() || 0) / 2;
            img.top = row * cellSize + cellSize / 2 - (img.getScaledHeight() || 0) / 2;
            
            canvasRef.current?.add(img);
            
            // 添加文字标签
            const text = new fabric.Text(editorState.items[index]?.caption || 'Add text description', {
              left: col * cellSize + cellSize / 2,
              top: (row * cellSize + cellSize / 2) + (img.getScaledHeight() || 0) / 2 + 20,
              fontFamily: 'Arial',
              fontSize: 16,
              fill: editorState.background === 'black' ? '#ffffff' : '#000000',
              textAlign: 'center',
              originX: 'center'
            });
            
            canvasRef.current?.add(text);
            
            // 更新状态
            const newItems = [...editorState.items];
            newItems[index] = {
              ...newItems[index],
              imageUrl: URL.createObjectURL(file)
            };
            
            setEditorState(prev => ({
              ...prev,
              items: newItems
            }));
          });
        } catch (error) {
          console.error('Error creating image:', error);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // 更新图片说明文字
  const handleCaptionChange = (index: number, caption: string) => {
    const newItems = [...editorState.items];
    if (newItems[index]) {
      newItems[index] = {
        ...newItems[index],
        caption
      };
    }
    
    setEditorState(prev => ({
      ...prev,
      items: newItems
    }));
    
    // 更新Canvas上的文本
    if (canvasRef.current && canvasInitialized) {
      try {
        const objects = canvasRef.current.getObjects();
        const textObjects = objects.filter((obj: any) => obj.type === 'text');
        
        // 找到对应位置的文本对象
        const gridSize = 3;
        const col = index % gridSize;
        const row = Math.floor(index / gridSize);
        
        for (const obj of textObjects) {
          if (obj.type === 'text' && 
              obj.left && obj.top && 
              Math.floor(obj.left / (800/gridSize)) === col &&
              Math.floor(obj.top / (800/gridSize)) === row) {
            (obj as any).set({
              text: caption || 'Add text description'
            });
            break;
          }
        }
        
        canvasRef.current.renderAll();
      } catch (error) {
        console.error('Error updating text:', error);
      }
    }
  };

  // 生成和下载图片
  const handleGenerateImage = () => {
    if (!canvasRef.current || !canvasInitialized || !fabric) return;
    
    try {
      // 添加标题和副标题
      const title = new fabric.Text(editorState.title, {
        top: 30,
        left: 400,
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: editorState.background === 'black' ? '#ffffff' : '#000000',
        textAlign: 'center',
        originX: 'center'
      });
      
      const subtitle = new fabric.Text(editorState.subtitle, {
        top: 80,
        left: 400,
        fontFamily: 'Arial',
        fontSize: 24,
        fill: editorState.background === 'black' ? '#ffffff' : '#000000',
        textAlign: 'center',
        originX: 'center'
      });
      
      canvasRef.current.add(title, subtitle);
      canvasRef.current.renderAll();
      
      // 生成图片并下载
      const dataURL = canvasRef.current.toDataURL({
        format: 'png',
        quality: 1
      });
      
      const link = document.createElement('a');
      link.download = `starter-pack-${Date.now()}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 移除标题和副标题
      canvasRef.current.remove(title, subtitle);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* 画布区域 */}
      <div className="flex-1">
        <div 
          ref={canvasContainerRef} 
          className="relative border rounded-lg overflow-hidden shadow-lg bg-white"
          style={{ aspectRatio: '1/1', maxWidth: '800px', margin: '0 auto' }}
        >
          <canvas id="meme-canvas" />
          {!canvasInitialized && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-gray-600">Loading editor...</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={handleGenerateImage} 
            size="lg" 
            disabled={!canvasInitialized}
          >
            Generate and Download
          </Button>
        </div>
      </div>
      
      {/* 控制面板 */}
      <div className="w-full md:w-80 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Editor Settings</h2>
        
        {/* 标题和副标题 */}
        <div className="mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editorState.title}
              onChange={(e) => setEditorState(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={editorState.subtitle}
              onChange={(e) => setEditorState(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* 背景样式 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Style
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditorState(prev => ({ ...prev, background: 'white' }))}
              className={`p-2 border rounded-md ${editorState.background === 'white' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
              White
            </button>
            <button
              onClick={() => setEditorState(prev => ({ ...prev, background: 'black' }))}
              className={`p-2 border rounded-md ${editorState.background === 'black' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
              Black
            </button>
            <button
              onClick={() => setEditorState(prev => ({ ...prev, background: 'film' }))}
              className={`p-2 border rounded-md ${editorState.background === 'film' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
              Film Border
            </button>
          </div>
        </div>
        
        {/* 项目编辑 */}
        <div>
          <h3 className="text-lg font-medium mb-3">Images and Text</h3>
          <div className="space-y-4">
            {editorState.items.map((item, index) => (
              <ItemControl
                key={item.id}
                index={index}
                item={item}
                onImageChange={(file: File) => handleAddImage(index, file)}
                onCaptionChange={(text: string) => handleCaptionChange(index, text)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarterPackEditor; 