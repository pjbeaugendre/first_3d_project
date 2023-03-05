import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: 'src/',
    base: './',
    publicDir: '../static/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                contact: resolve(__dirname, 'src/contact.html'),
                profile: resolve(__dirname, 'src/profile.html'),
                projects: resolve(__dirname, 'src/projects.html'),
                scriptjs: resolve(__dirname, 'src/js/script.js'),
                navbarjs: resolve(__dirname, 'src/js/navbar.js'),
                stylecss: resolve(__dirname, 'src/css/style.css'),
                navigationcss: resolve(__dirname, 'src/css/navigation.css'),
                profilecss: resolve(__dirname, 'src/css/profile.css'),
            }
        }
    }
})