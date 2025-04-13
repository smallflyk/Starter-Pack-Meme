import { StarterPackCategory } from "../types";
import { v4 as uuidv4 } from "uuid";

// Placeholder image path
const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export const categories: StarterPackCategory[] = [
  {
    id: uuidv4(),
    name: "Urban Worker",
    description: "996 work schedule, food delivery life, overtime warriors",
    thumbnail: PLACEHOLDER_IMAGE,
    templates: [
      {
        id: uuidv4(),
        title: "Typical Urban Worker Essentials",
        subtitle: "Not a real worker without these",
        items: [
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "A day can't start without coffee"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Always ready laptop"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Top 3 most used food delivery apps"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Eye drops for fatigue"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Late night work chat with 99+ messages"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Rush hour subway 'superhero' skills"
          }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Tech Guy",
    description: "Electronics collector, code enthusiast, geek culture",
    thumbnail: PLACEHOLDER_IMAGE,
    templates: [
      {
        id: uuidv4(),
        title: "Tech Guy Starter Pack",
        subtitle: "Yes, we're talking about you",
        items: [
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Mechanical keyboard, the louder the better"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "All green GitHub contribution wall"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Noise-cancelling headphones always on"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Smartwatch tracking everything"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "More Reddit than social media"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Dark mode on all apps"
          }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Artsy Youth",
    description: "Cafe regular, film camera enthusiast, niche book collector",
    thumbnail: PLACEHOLDER_IMAGE,
    templates: [
      {
        id: uuidv4(),
        title: "Standard Artsy Youth Setup",
        subtitle: "Both soul and aesthetics are high-end",
        items: [
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Vintage film camera documenting life"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Sitting in an independent cafe all day"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Moleskine notebook always carried"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Vinyl record collecting habit"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Tote bag with obscure band name"
          },
          {
            id: uuidv4(),
            imageUrl: PLACEHOLDER_IMAGE,
            caption: "Modern poetry collection ready to quote"
          }
        ]
      }
    ]
  }
]; 