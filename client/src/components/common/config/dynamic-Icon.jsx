import * as icons  from 'lucide-react';

export default function DynamicIcon({ iconName, size = 24, color = 'currentColor' }) {
  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent size={size} className={color} /> : null;
  
}


// const DynamicIcon = ({ iconName, size = 24, color = 'currentColor' }) => {
//   // Dynamically resolve the icon component
//   const IconComponent = Icons[iconName];
//   // If icon exists, render it; otherwise, fallback to null or placeholder
//   return IconComponent ? <IconComponent size={size} color={color} /> : null;
// };