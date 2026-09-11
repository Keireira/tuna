import type { LandingCopyT } from '@/content/landing';
import { productMedia, type ProductMediaIdT } from '@/content/product-media';
import ProductMediaSlot from '../product-media-slot/product-media-slot';
import MediaGallery from '../media-gallery/media-gallery';
import IPhoneFrame from '../product-showcase/iphone-frame';

type PropsT = { copy: LandingCopyT; allowPlaceholders: boolean };
const hasRecording = (id: ProductMediaIdT) => {
	const media = productMedia[id];
	return media.status === 'approved' && Boolean(media.src && media.poster);
};
const ProductStory = ({ copy, allowPlaceholders }: PropsT) => (
	<>
		<section className="discovery section-width story-section" id="discovery" aria-labelledby="discovery-title">
			<div className="section-intro">
				<p className="eyebrow">{copy.search.eyebrow}</p>
				<h2 id="discovery-title">{copy.search.title}</h2>
				<p className="section-description">{copy.search.body}</p>
			</div>
			<div className="discovery-grid">
				<figure className="search-visual">
					<ProductMediaSlot id="search-results" copy={copy.media} allowPlaceholders={allowPlaceholders} crop />
					<figcaption>
						{copy.search.caption}
						<span aria-hidden="true">↗</span>
					</figcaption>
				</figure>
				<div className="search-notes">
					{(['one', 'two', 'three'] as const).map((key) => (
						<div key={key}>
							<h3>{copy.search[`${key}Title`]}</h3>
							<p>{copy.search[`${key}Body`]}</p>
						</div>
					))}
					<p className="fine-print">{copy.search.note}</p>
				</div>
			</div>
			{hasRecording('search-flow') && (
				<details className="media-disclosure">
					<summary>
						{copy.search.flow}
						<span aria-hidden="true">+</span>
					</summary>
					<div className="recording-slot">
						<ProductMediaSlot id="search-flow" copy={copy.media} />
					</div>
				</details>
			)}
		</section>
		<section className="analytics story-section" id="analytics" aria-labelledby="analytics-title">
			<div className="section-width">
				<div className="analytics-heading">
					<div>
						<p className="eyebrow">{copy.analytics.eyebrow}</p>
						<h2 id="analytics-title">{copy.analytics.title}</h2>
					</div>
					<p className="section-description">{copy.analytics.body}</p>
				</div>
				<div className="analytics-grid">
					<MediaGallery
						items={[
							{ id: 'analytics-spending', label: copy.analytics.spending, description: copy.analytics.spendingBody },
							{ id: 'analytics-compare', label: copy.analytics.compare, description: copy.analytics.compareBody }
						]}
						label={copy.analytics.eyebrow}
						copy={copy.media}
						allowPlaceholders={allowPlaceholders}
						crop={false}
					/>
					<div className="breakdown">
						<p className="eyebrow">{copy.analytics.scales}</p>
						<div className="phone-preview">
							<IPhoneFrame>
								<ProductMediaSlot id="analytics-breakdown" copy={copy.media} />
							</IPhoneFrame>
						</div>
						<p className="gallery-caption">{copy.analytics.breakdown}</p>
					</div>
				</div>
				<p className="analytics-note fine-print">{copy.analytics.note}</p>
			</div>
		</section>
		<section className="filters story-section" id="filters" aria-labelledby="filters-title">
			<div className="filter-story section-width">
				<div className="filter-copy">
					<p className="eyebrow">{copy.filters.eyebrow}</p>
					<h2 id="filters-title">{copy.filters.title}</h2>
					<p className="section-description">{copy.filters.body}</p>
					<p className="fine-print">{copy.filters.note}</p>
					{hasRecording('filters-flow') && (
						<details className="media-disclosure">
							<summary>
								{copy.filters.flow}
								<span aria-hidden="true">+</span>
							</summary>
							<div className="recording-slot">
								<ProductMediaSlot id="filters-flow" copy={copy.media} />
							</div>
						</details>
					)}
				</div>
				<figure className="filter-visual">
					<ProductMediaSlot id="filters-applied" copy={copy.media} crop />
					<figcaption>
						{copy.filters.caption}
						<span aria-hidden="true">↗</span>
					</figcaption>
				</figure>
			</div>
		</section>
		<section className="timeline story-section" id="timeline" aria-labelledby="timeline-title">
			<div className="timeline-grid section-width">
				<div>
					<p className="eyebrow">{copy.timeline.eyebrow}</p>
					<h2 id="timeline-title">{copy.timeline.title}</h2>
					<div className="timeline-copy">
						<p className="section-description">{copy.timeline.body}</p>
						<p className="timeline-events">{copy.timeline.events}</p>
						{hasRecording('timeline-flow') && (
							<details className="media-disclosure">
								<summary>
									{copy.timeline.flow}
									<span aria-hidden="true">+</span>
								</summary>
								<div className="recording-slot">
									<ProductMediaSlot id="timeline-flow" copy={copy.media} />
								</div>
							</details>
						)}
					</div>
				</div>
				<figure className="timeline-visual">
					<IPhoneFrame>
						<ProductMediaSlot id="timeline-events" copy={copy.media} />
					</IPhoneFrame>
					<figcaption>{copy.timeline.caption}</figcaption>
				</figure>
			</div>
		</section>
	</>
);
export default ProductStory;
