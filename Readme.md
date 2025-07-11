

## **Backend install command:**

```bash
npm install bcryptjs cloudinary cookie-parser cors dotenv express joi jsonwebtoken mongoose multer nodemon npm
```

* **bcryptjs**: A library for securely hashing and comparing passwords in JavaScript.
* **cloudinary**: A cloud-based media management service for uploading, storing, and transforming images and videos.
* **cookie-parser**: Middleware to parse cookies attached to client requests in Express.
* **cors**: Middleware to enable Cross-Origin Resource Sharing in Express applications.
* **dotenv**: Loads environment variables from a `.env` file into `process.env`.
* **express**: A minimal and flexible Node.js web framework for building APIs and web apps.
* **joi**: A data validation library for defining and enforcing schemas in JavaScript.
* **jsonwebtoken**: A library to generate and verify JSON Web Tokens for authentication.
* **mongoose**: An ODM (Object Data Modeling) library for working with MongoDB in Node.js.
* **multer**: Middleware for handling file uploads in Node.js/Express apps.
* **nodemon**: A development tool that automatically restarts your Node.js server on file changes.
* **npm**: The Node package manager, used to install and manage JavaScript packages.



---

## **Frontend install command:**

```bash
npm install @reduxjs/toolkit axios class-variance-authority clsx lucide-react react react-dom react-redux react-router-dom tailwind-merge tailwindcss-animate
```


* **@reduxjs/toolkit**: Simplifies building Redux logic with cleaner, more efficient patterns.
* **axios**: A promise-based HTTP client for making API requests in JavaScript.
* **class-variance-authority**: A utility to manage and compose Tailwind CSS class names with variants.
* **clsx**: A simple utility to conditionally combine class names.
* **lucide-react**: Provides a set of beautifully designed React SVG icons.
* **react**: The core JavaScript library for building user interfaces.
* **react-dom**: Provides DOM-specific methods for using React on web browsers.
* **react-redux**: Official React bindings for Redux state management.
* **react-router-dom**: Routing library for handling navigation in React web apps.
* **tailwind-merge**: Merges Tailwind CSS classes intelligently to avoid conflicts.
* **tailwindcss-animate**: Adds pre-built, configurable animations to Tailwind CSS projects.


## How to Add Shadcn UI in React

#### 1. Install Tailwind CSS
Install tailwindcss and @tailwindcss/vite via npm.

```bash
npm install tailwindcss @tailwindcss/vite
```
#### 2. Configure the Vite plugin
Add the @tailwindcss/vite plugin to your Vite configuration.

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' //add this line
export default defineConfig({
  plugins: [
    tailwindcss(), //add this line 
  ],
})
```

#### 3. Import Tailwind CSS
Add an @import to your CSS file that imports Tailwind CSS. 
we add in **index.css**

```js
//src/index.css 
@import "tailwindcss";
```
#### 4. Create these File in Root Folder 
###### 1. **jsconfig.json** 


```json
{
    //jsconfig.json
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "include": [
        "src",
        "../admin/pages/admin",
        "../admin/store/admin-slice"
    ]
}
```


2. **jsconfigapp.json**

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    },
    "include": [
        "server"
    ]
}
```




#### 4. Update vite.config.ts
Add the following code to the vite.config.ts so your app can resolve paths without error:

```bash
npm install -D @types/node
```

**vite.config.js**

```js
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```
### 5. Run the CLI
Run the shadcn init command to setup your project:

```bash
npx shadcn@latest init
```

You can then import it like this:


```bash
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add checkbox
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add separator
npx shadcn@latest add sheet
npx shadcn@latest add skeleton
npx shadcn@latest add table
npx shadcn@latest add tabs
npx shadcn@latest add textarea
npx shadcn@latest add sonner

```




