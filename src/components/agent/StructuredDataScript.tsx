'use client';

import { useServerInsertedHTML } from 'next/navigation';

type TProps = {
	id: string;
	json: unknown;
};

const StructuredDataScript = ({ id, json }: TProps) => {
	const html = JSON.stringify(json);

	useServerInsertedHTML(() => <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: html }} />);

	return null;
};

export default StructuredDataScript;
