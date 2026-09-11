import SupportPage from '@/views/support-page/support-page';
import { getPageMetadata, getPageStructuredData } from '@/lib/seo';
import StructuredDataScript from '@/components/agent/StructuredDataScript';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@lib/i18n';

import type { Metadata } from 'next';

type TProps = {
	params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
	const { locale } = await params;
	if (!isValidLocale(locale)) return {};

	return getPageMetadata(locale, 'support');
};

const Page = async ({ params }: TProps) => {
	const { locale } = await params;
	if (!isValidLocale(locale)) notFound();
	return (
		<>
			<StructuredDataScript id="uha-support-jsonld" json={await getPageStructuredData(locale, 'support')} />
			<SupportPage locale={locale} />
		</>
	);
};

export default Page;
