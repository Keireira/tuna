import { APP_STORE_URL, type LandingCopyT, type StorefrontPriceT } from '@/content/landing';

type PropsT = { copy: LandingCopyT; locale: string; storefrontPrice: StorefrontPriceT };
const ProductPricing = ({ copy, locale, storefrontPrice }: PropsT) => {
	const p = copy.pricing;
	const price =
		storefrontPrice &&
		new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: storefrontPrice.currency,
			minimumFractionDigits: Number.isInteger(Number(storefrontPrice.price)) ? 0 : undefined
		}).format(Number(storefrontPrice.price));
	const rows = [
		[p.subscriptions, p.freeSubscriptions, p.unlimitedSubscriptions],
		[p.currencies, p.freeCurrencies, p.allCurrencies],
		[p.horizon, p.threeYears, p.twelveYears],
		[p.rows.export.label, p.rows.export.free, p.rows.export.paid],
		[p.cloud, p.notIncluded, p.included],
		[p.backup, p.notIncluded, p.included],
		[p.futurePremium, p.notIncluded, p.included]
	];
	return (
		<section className="pricing story-section" id="unlimited" aria-labelledby="pricing-title">
			<div className="section-width">
				<div className="pricing-intro">
					<p className="eyebrow">{p.eyebrow}</p>
					<h2 id="pricing-title">{p.title}</h2>
					<p>{p.body}</p>
				</div>
				<table className="pricing-table">
					<caption className="sr-only">{p.feature}</caption>
					<colgroup>
						<col className="pricing-feature-column" />
						<col />
						<col />
					</colgroup>
					<thead>
						<tr>
							<th scope="col">
								<span className="sr-only">{p.feature}</span>
							</th>
							<th scope="col">
								{p.free}
								<small>{p.start}</small>
							</th>
							<th scope="col">
								{p.paid}
								<small>{p.forever}</small>
								{price && (
									<small className="pricing-storefront">
										<mark className="pricing-price" aria-describedby="pricing-region-note">
											{price}
											<sup aria-hidden="true">*</sup>
										</mark>
									</small>
								)}
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map(([label, free, paid]) => (
							<tr key={label}>
								<th scope="row">{label}</th>
								<td>{free}</td>
								<td>{paid}</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="pricing-bottom">
					<div>
						{price && (
							<p id="pricing-region-note">
								<span aria-hidden="true">* </span>
								{p.storefrontPrice}
							</p>
						)}
						<p>{p.note}</p>
					</div>
					<a className="download-button" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
						{copy.hero.download}
						<span aria-hidden="true">↗</span>
					</a>
				</div>
				<aside className="pricing-support" aria-labelledby="pricing-support-title">
					<h3 id="pricing-support-title">{p.supportTitle}</h3>
					<p>{p.supportBody}</p>
				</aside>
			</div>
		</section>
	);
};
export default ProductPricing;
