import LandingPage from '@/views/landing-page/landing-page';
import StructuredDataScript from '@/components/agent/StructuredDataScript';
import { getPageMetadata, getPageStructuredData } from '@/lib/seo';
import { getTranslation } from '@lib/i18n/server';
import type { LandingCopyT } from '@/content/landing';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@lib/i18n';
import { getLocalePrice } from '@/lib/price-catalog';

import type { Metadata } from 'next';

type TProps = {
	params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
	const { locale } = await params;
	if (!isValidLocale(locale)) return {};

	return getPageMetadata(locale);
};

const Page = async ({ params }: TProps) => {
	const { locale } = await params;
	if (!isValidLocale(locale)) notFound();
	const { t } = await getTranslation(locale, 'landing');
	return (
		<>
			<StructuredDataScript id="uha-home-jsonld" json={await getPageStructuredData(locale)} />
			<LandingPage
				copy={t('showcase', { returnObjects: true }) as LandingCopyT}
				locale={locale}
				unlimitedPrice={getLocalePrice(locale)}
			/>
		</>
	);
};

export default Page;
