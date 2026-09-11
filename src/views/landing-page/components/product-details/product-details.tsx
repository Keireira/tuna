import type { LandingCopyT } from '@/content/landing';
import MediaGallery from '../media-gallery/media-gallery';

type PropsT = { copy: LandingCopyT; allowPlaceholders: boolean };
const ProductDetails = ({ copy, allowPlaceholders }: PropsT) => (
	<section className="everyday story-section" id="more" aria-labelledby="everyday-title">
		<div className="section-width">
			<p className="eyebrow">{copy.details.eyebrow}</p>
			<h2 id="everyday-title">{copy.details.title}</h2>
			<div className="everyday-grid">
				<dl className="detail-list">
					{(['currency', 'reminders', 'organize', 'local', 'export'] as const).map((key) => (
						<div key={key}>
							<dt>{copy.details[`${key}Title`]}</dt>
							<dd>{copy.details[`${key}Body`]}</dd>
						</div>
					))}
				</dl>
				<div className="appearance">
					<MediaGallery
						items={[
							{ id: 'appearance-light', label: copy.details.light },
							{ id: 'appearance-dark', label: copy.details.dark },
							{ id: 'appearance-deep', label: copy.details.deep }
						]}
						label={copy.details.appearanceTitle}
						copy={copy.media}
						allowPlaceholders={allowPlaceholders}
						crop={false}
					/>
					<h3>{copy.details.appearanceTitle}</h3>
					<p>{copy.details.appearanceBody}</p>
				</div>
			</div>
		</div>
	</section>
);
export default ProductDetails;
