'use client';
import { Fragment, useState } from 'react';
import { viewModes, type LandingCopyT } from '@/content/landing';
import ProductMediaSlot from '../product-media-slot/product-media-slot';
import IPhoneFrame from './iphone-frame';

type PropsT = { copy: LandingCopyT; allowPlaceholders: boolean; simple: boolean };
const ProductShowcase = ({ copy, allowPlaceholders, simple }: PropsT) => {
	const [mode, setMode] = useState<(typeof viewModes)[number]>('month');
	const activeIndex = viewModes.indexOf(mode);
	return (
		<div className="showcase" id="views" data-view={mode} data-simple={simple}>
			<div className="showcase-topline">
				<span>{copy.hero.index}</span>
				<span>0{activeIndex + 1} / 04</span>
			</div>
			<div className="showcase-accordion" role="group" aria-label={copy.hero.index}>
				{viewModes.map((view, index) => (
					<Fragment key={view}>
						<button
							className={`view-ribbon view-${view}`}
							style={{ gridColumn: index * 2 + 1 }}
							type="button"
							onClick={() => setMode(view)}
							aria-pressed={view === mode}
							aria-controls="active-view"
						>
							<span>{copy.views[view].label}</span>
							<span aria-hidden="true">0{index + 1}</span>
						</button>
						<div className={`view-panel view-${view}`} style={{ gridColumn: index * 2 + 2 }} aria-hidden="true" />
					</Fragment>
				))}
				<div className="view-active-content" id="active-view" style={{ gridColumn: activeIndex * 2 + 2 }}>
					<div className="view-content-layout">
						<div className="view-caption" aria-live="polite">
							<strong key={mode}>{copy.views[mode].title}</strong>
							<p>{copy.views[mode].body}</p>
						</div>
						<div className="showcase-stage">
							<div className="showcase-screen">
								<IPhoneFrame>
									<ProductMediaSlot
										id={`views-${mode}`}
										copy={copy.media}
										allowPlaceholders={allowPlaceholders}
										priority
									/>
								</IPhoneFrame>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductShowcase;
