export interface SearchItem {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string; // Path to the image asset
  imageUrl: string;    // Path to the image asset
  views: number;
  likes: number;
}

export const mockData: SearchItem[] = [
  // Data based on the grid view (right side of image)
  {
    id: '1',
    title: 'halo energy sword',
    category: 'Projects', // Assumed category
    thumbnailUrl: 'assets/images/image (1).png', // Using available image, adjust if specific one exists
    imageUrl: 'assets/images/image (1).png', // Using available image, adjust if specific one exists
    views: 10100, // From image (10.1K)
    likes: 2435  // From image
  },
  {
    id: '2',
    title: 'latteintosh diy mini pc',
    category: 'Electronics', // Assumed category
    thumbnailUrl: 'assets/images/Gameboy XL.png', // Corrected path from file listing
    imageUrl: 'assets/images/Gameboy XL.png', // Corrected path from file listing
    views: 10100, // From image (10.1K)
    likes: 2435  // From image
  },
  {
    id: '3',
    title: 'boxcilloscope',
    category: 'Tools', // Assumed category
    thumbnailUrl: 'assets/images/glitch.png', // Using available image
    imageUrl: 'assets/images/glitch.png', // Using available image
    views: 10100, // From image (10.1K)
    likes: 2435  // From image
  },
  {
    id: '4',
    title: 'power pi version 2',
    category: 'Electronics', // Assumed category
    thumbnailUrl: 'assets/images/RGB Glasses.png', // Corrected path from file listing
    imageUrl: 'assets/images/RGB Glasses.png', // Corrected path from file listing
    views: 10100, // From image (10.1K)
    likes: 2435  // From image
  },
  {
    id: '5',
    title: 'gameboy xl',
    category: 'Gaming', // Assumed category
    thumbnailUrl: 'assets/images/image (1).png', // Corrected path from file listing
    imageUrl: 'assets/images/image (1).png', // Corrected path from file listing
    views: 10100, // Placeholder, not visible in image for this item
    likes: 2435  // Placeholder, not visible in image for this item
  },
  {
    id: '6',
    title: 'rgb glasses',
    category: 'Gadgets', // Assumed category
    thumbnailUrl: 'assets/images/RGB Glasses.png', // Reusing image
    imageUrl: 'assets/images/RGB Glasses.png', // Reusing image
    views: 10100, // Placeholder
    likes: 2435  // Placeholder
  },
  // Data based on search suggestions (left side of image)
  {
    id: '7',
    title: 'raspberry pi zero 2w',
    category: 'Parts', // From image
    thumbnailUrl: 'assets/images/glitch.png', // Using available image
    imageUrl: 'assets/images/glitch.png', // Using available image
    views: 15243, // Keeping old value as placeholder
    likes: 1832  // Keeping old value as placeholder
  },
  {
    id: '8',
    title: 'railway crossing automation',
    category: 'Projects', // From image
    thumbnailUrl: '', // No specific image provided/mapped
    imageUrl: '', // No specific image provided/mapped
    views: 12456, // Keeping old value as placeholder
    likes: 1567  // Keeping old value as placeholder
  },
  {
    id: '9',
    title: 'radio communication',
    category: 'Topics', // From image
    thumbnailUrl: '', // No specific image provided/mapped
    imageUrl: '', // No specific image provided/mapped
    views: 8976, // Keeping old value as placeholder
    likes: 743  // Keeping old value as placeholder
  },
  {
    id: '10',
    title: 'rashid_24_khan',
    category: 'Users', // From image
    thumbnailUrl: '', // No specific image provided/mapped
    imageUrl: '', // No specific image provided/mapped
    views: 23567, // Keeping old value as placeholder
    likes: 2145  // Keeping old value as placeholder
  },
];
