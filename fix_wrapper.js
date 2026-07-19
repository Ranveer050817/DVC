const fs = require('fs');
const file = 'src/pages/ProductsPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `<div className="relative h-[80%] w-full p-4 flex items-center justify-center bg-white/5 overflow-hidden">              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />              <img referrerPolicy="no-referrer"                 src={product.image}                 alt={product.name}                className="w-full h-full object-contain block transform group-hover:scale-110 transition-transform duration-700 relative z-0 drop-shadow-xl"               />            </div>`;

const replacement = `            <div className="relative h-[80%] w-full p-6 flex items-center justify-center bg-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img referrerPolicy="no-referrer" 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain block transform group-hover:scale-110 transition-transform duration-700 relative z-0 drop-shadow-2xl" 
              />
            </div>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log('Fixed');
} else {
  console.log('Not found');
}
