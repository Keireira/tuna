'use client';

import { useRef, useState } from 'react';
import { productMedia, resolveMediaSource, type ProductMediaIdT } from '@/content/product-media';
import type { LandingCopyT } from '@/content/landing';
import { MediaFrame, MediaDialog } from './product-media-slot.styles';

type PropsT = {
	id: ProductMediaIdT;
	copy: LandingCopyT['media'];
	allowPlaceholders?: boolean;
	priority?: boolean;
	crop?: boolean;
};

const ProductMediaSlot = ({ id, copy, allowPlaceholders = false, priority = false, crop = false }: PropsT) => {
	const media = productMedia[id];
	const title = copy.titles?.[id] ?? media.purpose;
	const mediaSource = resolveMediaSource(media, allowPlaceholders);
	const [failedSource, setFailedSource] = useState<string | null>(null);
	const source = mediaSource === failedSource ? null : mediaSource;
	const dialog = useRef<HTMLDialogElement>(null);
	const isPlaceholder = source !== null && media.status !== 'approved';
	return (
		<MediaFrame
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
						onClick={() => dialog.current?.showModal()}
					>
						<img
							src={source}
							onError={() => setFailedSource(mediaSource)}
							alt={isPlaceholder ? `${copy.reference}: ${copy[id]}` : copy[id]}
							width={media.width}
							height={media.height}
							loading={priority ? 'eager' : 'lazy'}
							fetchPriority={priority ? 'high' : 'auto'}
						/>
					</button>
					{isPlaceholder && <span className="media-status">{copy.reference}</span>}
					<MediaDialog
						ref={dialog}
						aria-label={title}
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
							<img
								src={source}
								onError={() => setFailedSource(mediaSource)}
								alt={copy[id]}
								width={media.width}
								height={media.height}
								loading="lazy"
							/>
							{isPlaceholder && <p>{copy.reference}</p>}
						</div>
					</MediaDialog>
				</>
			) : source && media.kind === 'video' && media.poster ? (
				<video
					controls
					playsInline
					preload="none"
					poster={media.poster}
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
