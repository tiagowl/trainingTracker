import { defineConfig } from 'vite';

export default defineConfig(async () => {
  let reactPlugin: any = undefined;
  try {
    // Optional: use React plugin if available (for Fast Refresh, etc.)
    const mod = await import('@vitejs/plugin-react');
    reactPlugin = mod.default();
  } catch {
    // Fallback: run without the React plugin
    reactPlugin = undefined;
  }

  return {
    plugins: reactPlugin ? [reactPlugin] : [],
    server: { port: 5173 }
  };
});
