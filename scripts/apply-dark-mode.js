const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'src/app/listing/[id]/ListingClient.tsx',
  'src/components/ContactModal.tsx',
  'src/components/ReviewModal.tsx',
  'src/components/ShareModal.tsx',
  'src/components/ReportModal.tsx',
  'src/components/BookingWidget.tsx',
  'src/components/DetailPageSkeleton.tsx'
];

const replacements = [
  { regex: /text-\[#222222\](?!\s+dark:)/g, replacement: 'text-[#222222] dark:text-white' },
  { regex: /text-\[#717171\](?!\s+dark:)/g, replacement: 'text-[#717171] dark:text-[#A0A0A0]' },
  { regex: /text-\[#B0B0B0\](?!\s+dark:)/g, replacement: 'text-[#B0B0B0] dark:text-[#6B6B6B]' },
  { regex: /bg-\[#F7F7F7\](?!\s+dark:)/g, replacement: 'bg-[#F7F7F7] dark:bg-[#1A1A1A]' },
  { regex: /bg-white(?!\s+dark:)/g, replacement: 'bg-white dark:bg-[#1E1E1E]' }, // Usually card backgrounds in these modals
  { regex: /border-\[#DDDDDD\](?!\s+dark:)/g, replacement: 'border-[#DDDDDD] dark:border-[#3D3D3D]' },
  { regex: /border-\[#EBEBEB\](?!\s+dark:)/g, replacement: 'border-[#EBEBEB] dark:border-[#3D3D3D]' },
  { regex: /border-gray-200(?!\s+dark:)/g, replacement: 'border-gray-200 dark:border-[#3D3D3D]' },
  { regex: /text-gray-600(?!\s+dark:)/g, replacement: 'text-gray-600 dark:text-gray-400' },
  { regex: /text-gray-700(?!\s+dark:)/g, replacement: 'text-gray-700 dark:text-gray-300' },
  { regex: /text-gray-500(?!\s+dark:)/g, replacement: 'text-gray-500 dark:text-gray-400' },
  { regex: /text-gray-800(?!\s+dark:)/g, replacement: 'text-gray-800 dark:text-white' },
  { regex: /bg-gray-50(?!\s+dark:)/g, replacement: 'bg-gray-50 dark:bg-[#1A1A1A]' },
  { regex: /hover:bg-gray-50(?!\s+dark:)/g, replacement: 'hover:bg-gray-50 dark:hover:bg-[#2D2D2D]' },
  { regex: /hover:bg-gray-100(?!\s+dark:)/g, replacement: 'hover:bg-gray-100 dark:hover:bg-[#2D2D2D]' },
  { regex: /bg-gray-100(?!\s+dark:)/g, replacement: 'bg-gray-100 dark:bg-[#2D2D2D]' },
  { regex: /fill-\[#222222\](?!\s+dark:)/g, replacement: 'fill-[#222222] dark:fill-white' },
  { regex: /stroke-\[#222222\](?!\s+dark:)/g, replacement: 'stroke-[#222222] dark:stroke-white' },
  { regex: /border-gray-300(?!\s+dark:)/g, replacement: 'border-gray-300 dark:border-[#3D3D3D]' },
  { regex: /border-\[#222222\](?!\s+dark:)/g, replacement: 'border-[#222222] dark:border-[#6B6B6B]' },
];

filesToProcess.forEach(relPath => {
  const fullPath = path.join('e:/ORMA', relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;
    replacements.forEach(({ regex, replacement }) => {
      content = content.replace(regex, replacement);
    });
    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${relPath}`);
    }
  } else {
    console.log(`File not found: ${relPath}`);
  }
});
