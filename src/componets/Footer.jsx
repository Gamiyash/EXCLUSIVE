// // src/components/Footer.jsx
// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-10 w-full">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Column 1</h3>
//           <ul>
//             <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Column 2</h3>
//           <ul>
//             <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Column 3</h3>
//           <ul>
//             <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Column 4</h3>
//           <ul>
//             <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Column 5</h3>
//           <ul>
//             <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
//             <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 w-full">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
        <div>
          <h3 className="text-lg font-semibold mb-2">Column 1</h3>
          <ul>
            <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Column 2</h3>
          <ul>
            <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Column 3</h3>
          <ul>
            <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Column 4</h3>
          <ul>
            <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Column 5</h3>
          <ul>
            <li><a href="#" className="text-sm hover:underline">Link 1</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 2</a></li>
            <li><a href="#" className="text-sm hover:underline">Link 3</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

