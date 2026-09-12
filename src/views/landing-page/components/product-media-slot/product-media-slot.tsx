'use client';

import Image, { getImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { productMedia, resolveMediaSource, type ProductMediaIdT } from '@/content/product-media';
import type { LandingCopyT } from '@/content/landing';
import { MediaFrame, MediaDialog } from './product-media-slot.styles';
import { mediaImageSources } from './media-image-sources';

type PropsT = {
	id: ProductMediaIdT;
	copy: LandingCopyT['media'];
	allowPlaceholders?: boolean;
	priority?: boolean;
	crop?: boolean;
	sizes?: string;
};

const ProductMediaSlot = ({ id, copy, allowPlaceholders = false, priority = false, crop = false, sizes }: PropsT) => {
	const media = productMedia[id];
	const title = copy.titles?.[id] ?? media.purpose;
	const mediaSource = resolveMediaSource(media, allowPlaceholders);
	const [failedSource, setFailedSource] = useState<string | null>(null);
	const source = mediaSource === failedSource ? null : mediaSource;
	const frame = useRef<HTMLDivElement>(null);
	const dialog = useRef<HTMLDialogElement>(null);
	const [zoomSource, setZoomSource] = useState<string | null>(null);
	const [visibleVideoSource, setVisibleVideoSource] = useState<string | null>(null);
	const isPlaceholder = source !== null && media.status !== 'approved';
	const imageSizes = sizes ?? (crop ? '(max-width: 720px) calc(100vw - 28px), 660px' : '340px');
	useEffect(() => {
		if (media.kind !== 'video' || !source || !media.poster || !frame.current) return;
		if (!('IntersectionObserver' in window)) {
			setVisibleVideoSource(source);
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				setVisibleVideoSource(source);
				observer.disconnect();
			},
			{ rootMargin: '300px' }
		);
		observer.observe(frame.current);
		return () => observer.disconnect();
	}, [media.kind, media.poster, source]);
	// Video phone frames are at most 300px wide; keep a 2x poster without fetching the original.
	const videoPoster =
		media.kind === 'video' && media.poster && visibleVideoSource === source
			? getImageProps({
					src: mediaImageSources[id] ?? media.poster,
					alt: '',
					width: 320,
					height: Math.round((320 * media.height) / media.width)
				}).props.src
			: undefined;
	return (
		<MediaFrame
			ref={frame}
			$ratio={`${media.width} / ${media.height}`}
			$crop={crop}
			$focalPoint={media.focalPoint ?? 'center 34%'}
			data-media-id={id}
			data-media-status={media.status}
		>
			{source && media.kind === 'image' ? (
				<>
					<button
						type="button"
						className="media-image-button"
						aria-label={`${copy.view}: ${title}`}
						onClick={() => {
							setZoomSource(source);
							dialog.current?.showModal();
						}}
					>
						<Image
							src={isPlaceholder ? source : (mediaImageSources[id] ?? source)}
							onError={() => setFailedSource(mediaSource)}
							alt={isPlaceholder ? `${copy.reference}: ${copy[id]}` : copy[id]}
							width={media.width}
							height={media.height}
							sizes={priority ? imageSizes : `auto, ${imageSizes}`}
							loading={priority ? 'eager' : 'lazy'}
							fetchPriority={priority ? 'high' : 'auto'}
						/>
					</button>
					{isPlaceholder && <span className="media-status">{copy.reference}</span>}
					<MediaDialog
						ref={dialog}
						aria-label={title}
						onClose={() => setZoomSource(null)}
						onClick={(event) => {
							if (event.target === event.currentTarget) dialog.current?.close();
						}}
					>
						<header className="media-dialog-toolbar">
							<strong>{title}</strong>
							<form method="dialog">
								<button className="media-dialog-close" autoFocus aria-label={copy.close}>
									{copy.close}
									<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.5" />
									</svg>
								</button>
							</form>
						</header>
						<div className="media-dialog-body">
							{zoomSource === source && (
								<img
									src={source}
									onError={() => setFailedSource(mediaSource)}
									alt={copy[id]}
									width={media.width}
									height={media.height}
									decoding="async"
								/>
							)}
							{isPlaceholder && <p>{copy.reference}</p>}
						</div>
					</MediaDialog>
				</>
			) : source && media.kind === 'video' && media.poster ? (
				<video
					controls
					playsInline
					preload="none"
					poster={videoPoster}
					width={media.width}
					height={media.height}
					aria-label={title}
					src={source}
					onError={() => setFailedSource(mediaSource)}
				/>
			) : (
				<div className="media-placeholder">
					<span className="media-index" aria-hidden="true">
						{media.kind === 'video' ? 'REC' : 'Uha'}
					</span>
					<div>
						<span className="media-code">{id.toUpperCase()}</span>
						<p>{title}</p>
						<small>{media.kind === 'video' ? copy.videoMissing : copy.missing}</small>
					</div>
				</div>
			)}
		</MediaFrame>
	);
};
export default ProductMediaSlot;
