/// <reference types="vite-imagetools" />

declare module "*.png?responsive" {
	const srcset: string;
	export default srcset;
}

declare module "*.jpg?responsive" {
	const srcset: string;
	export default srcset;
}

declare module "*.jpeg?responsive" {
	const srcset: string;
	export default srcset;
}

declare module "*.webp?responsive" {
	const srcset: string;
	export default srcset;
}
