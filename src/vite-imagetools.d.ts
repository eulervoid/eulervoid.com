/// <reference types="vite-imagetools" />

declare module "*.png?responsive-rgb" {
    const srcset: string;
    export default srcset;
}

declare module "*.jpg?responsive-rgb" {
    const srcset: string;
    export default srcset;
}

declare module "*.jpeg?responsive-rgb" {
    const srcset: string;
    export default srcset;
}

declare module "*.webp?responsive-rgb" {
    const srcset: string;
    export default srcset;
}

declare module "*.png?responsive-rgba" {
    const srcset: string;
    export default srcset;
}

declare module "*.webp?responsive-rgba" {
    const srcset: string;
    export default srcset;
}
