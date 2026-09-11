'use client';
import { useState } from 'react';
import type { LandingCopyT } from '@/content/landing';
import type { ProductMediaIdT } from '@/content/product-media';
import ProductMediaSlot from '../product-media-slot/product-media-slot';
import IPhoneFrame from '../product-showcase/iphone-frame';

type PropsT = {
	items: { id: ProductMediaIdT; label: string; description?: string }[];
	label: string;
	copy: LandingCopyT['media'];
	allowPlaceholders: boolean;
	crop?: boolean;
};
const MediaGallery = ({ items, label, copy, allowPlaceholders, crop = true }: PropsT) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selected = items[selectedIndex];
	return (
		<div className="media-gallery">
			<div className="gallery-switcher" role="group" aria-label={label}>
				{items.map((item, i) => (
					<button key={item.id} type="button" aria-pressed={i === selectedIndex} onClick={() => setSelectedIndex(i)}>
						{item.label}
					</button>
				))}
			</div>
			{crop ? (
				<ProductMediaSlot id={selected.id} copy={copy} allowPlaceholders={allowPlaceholders} crop />
			) : (
				<div className="phone-preview">
					<IPhoneFrame>
						<ProductMediaSlot id={selected.id} copy={copy} allowPlaceholders={allowPlaceholders} />
					</IPhoneFrame>
				</div>
			)}
			{selected.description && (
				<p className="gallery-caption" aria-live="polite">
					{selected.description}
				</p>
			)}
		</div>
	);
};
export default MediaGallery;
