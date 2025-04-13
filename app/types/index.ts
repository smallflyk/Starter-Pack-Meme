export interface StarterPackCategory {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  templates: StarterPackTemplate[];
}

export interface StarterPackTemplate {
  id: string;
  title: string;
  subtitle: string;
  items: StarterPackItem[];
}

export interface StarterPackItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface EditorState {
  title: string;
  subtitle: string;
  items: StarterPackItem[];
  background: 'white' | 'black' | 'film';
} 