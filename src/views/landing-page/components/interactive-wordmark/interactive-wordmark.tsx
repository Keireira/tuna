'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
	createWordmarkTapes,
	tapeDuration,
	tapeJunction,
	tapeOpacity,
	tapeRepeatCount
} from '@/content/wordmark-tapes';
import { useWordmarkScene } from './use-wordmark-scene';

const fallbackSlogans = ['Track your subscriptions down!'] as const;
type PropsT = { simple: boolean; label: string; slogans?: readonly string[] };

const InteractiveWordmark = ({ simple, label, slogans = fallbackSlogans }: PropsT) => {
	const [sloganIndex, setSloganIndex] = useState(0);
	useEffect(() => {
		setSloganIndex(Math.floor(Math.random() * slogans.length));
	}, [slogans]);
	const slogan = slogans[sloganIndex] || slogans[0] || fallbackSlogans[0];
	const tapes = useMemo(() => createWordmarkTapes(slogan), [slogan]);
	const { hostRef, ready } = useWordmarkScene(simple, tapes);
	return (
		<div
			ref={hostRef}
			className="hero-wordmark"
			role={ready ? 'button' : 'img'}
			aria-label={ready ? `UHA — ${label}` : 'UHA'}
			tabIndex={ready ? 0 : undefined}
		>
			<div
				className="wordmark-backdrop"
				aria-hidden="true"
				style={
					{
						'--tape-x': `${tapeJunction.x * 100}%`,
						'--tape-y': `${tapeJunction.y * 100}%`,
						'--tape-step': `${100 / tapeRepeatCount}%`
					} as CSSProperties
				}
			>
				{tapes.map((tape) => (
					<div
						key={tape.id}
						className="wordmark-tape"
						style={
							{
								'--tape-angle': `${tape.angle}deg`,
								'--tape-color': tape.color,
								'--tape-opacity': tapeOpacity,
								'--tape-duration': `${tapeDuration}s`,
								'--tape-direction': tape.direction === 1 ? 'normal' : 'reverse'
							} as CSSProperties
						}
					>
						<span>{tape.text.repeat(tapeRepeatCount)}</span>
					</div>
				))}
			</div>
			<span className="wordmark-fallback" aria-hidden="true">
				UHA
				<span className="wordmark-baseline" />
			</span>
		</div>
	);
};

export default InteractiveWordmark;
