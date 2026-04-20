'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

const useScrollAnimation = (threshold = 0.15) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: threshold });

	return { ref, isInView };
};

export default useScrollAnimation;
