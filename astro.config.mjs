// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    devToolbar: {
        enabled: false
    },
    env: {
        schema: {
            CLOUDFLARE_APIKEY: {
                type: 'string',
                context: 'server',
                access: 'public'
            },
            CLOUDFLARE_SECRETKEY: {
                type: 'string',
                context: 'server',
                access: 'secret'
            },
        }
    },
    output: 'server', // or 'hybrid'
    adapter: node({
        mode: "standalone", // "standalone" crea su propio servidor HTTP
    }),

});
