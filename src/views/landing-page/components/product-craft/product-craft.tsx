import type { LandingCopyT } from '@/content/landing';
import ProductMediaSlot from '../product-media-slot/product-media-slot';
import IPhoneFrame from '../product-showcase/iphone-frame';
import Root from './product-craft.styles';

type PropsT = { copy: LandingCopyT };

const CLIPS = [
	{ id: 'detail-year', key: 'year' },
	{ id: 'detail-scroll', key: 'scroll' }
] as const;

const ProductCraft = ({ copy }: PropsT) => (
	<Root className="story-section" id="craft" aria-labelledby="craft-title">
		<div className="section-width">
			<header className="craft-heading">
				<p className="eyebrow">{copy.craft.eyebrow}</p>
				<h2 id="craft-title">{copy.craft.title}</h2>
			</header>
			<div className="craft-grid">
				{CLIPS.map(({ id, key }) => (
					<figure className="craft-clip" key={id}>
						<div className="craft-stage">
							<div className="craft-phone">
								<IPhoneFrame>
									<ProductMediaSlot id={id} copy={copy.media} />
								</IPhoneFrame>
							</div>
						</div>
						<figcaption>
							<h3>{copy.craft[`${key}Title`]}</h3>
							<p>{copy.craft[`${key}Body`]}</p>
						</figcaption>
					</figure>
				))}
			</div>
		</div>
	</Root>
);

export default ProductCraft;
