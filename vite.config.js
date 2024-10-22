// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000', // Replace with your backend server URL
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//     host: true,
//     port: 5173 
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:process.env.NODE_ENV === 'production' ? {} :  {
      '/api': {
        target: 'https://exclusive-4.onrender.com', // Proxy for backend
        changeOrigin: true,
        secure: false,
      },
    },
    host: true, // Allows access from other devices like your mobile
    port: 5173, // Default Vite port
    watch: {
      usePolling: true, // This ensures better file watching, useful when using Docker or VMs
    }
  },
  build: {
    outDir: 'dist', // Make sure the output directory matches where you want to publish the site
  }
});
