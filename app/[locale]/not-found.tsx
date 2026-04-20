import Link from 'next/link';
import { headers } from 'next/headers';
import { getTranslation } from '@lib/i18n/server';
import { isValidLocale, DEFAULT_LOCALE, type TLocale } from '@lib/i18n';

const NotFound = async () => {
	const headersList = await headers();
	const pathname = headersList.get('x-pathname') ?? '';
	const pathLocale = pathname.split('/')[1];
	const locale: TLocale = isValidLocale(pathLocale) ? pathLocale : DEFAULT_LOCALE;

	const { t } = await getTranslation(locale, 'common');

	return (
		<main
			style={{
				minHeight: '80vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				padding: '24px'
			}}
		>
			<h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
			<p style={{ fontSize: '1.125rem', margin: '16px 0 24px' }}>{t('not_found.message')}</p>
			<Link
				href={`/${locale}`}
				style={{
					padding: '10px 20px',
					borderRadius: '10px',
					background: '#6033C0',
					color: '#fff',
					textDecoration: 'none',
					fontWeight: 600
				}}
			>
				{t('not_found.back')}
			</Link>
		</main>
	);
};

export default NotFound;
