import type { StaticImageData } from 'next/image';
import type { ProductMediaIdT } from '@/content/product-media';
import detailYear from '../../../../../public/assets/showcases/detail-year-poster-b4ff4154d9.jpg';
import detailScroll from '../../../../../public/assets/showcases/detail-scroll-poster-ee7f1b7fe1.jpg';

// Turbopack only recognizes lowercase image extensions. Keep the .PNG screenshots
// on their public URLs; lowercase posters can use automatic content hashes.
export const mediaImageSources: Partial<Record<ProductMediaIdT, StaticImageData>> = {
	'detail-year': detailYear,
	'detail-scroll': detailScroll
};
