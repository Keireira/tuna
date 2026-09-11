import { useEffect, useRef, useState } from 'react';
import type { WordmarkSceneT } from './wordmark-scene';
import type { WordmarkTapeT } from '@/content/wordmark-tapes';

export const useWordmarkScene = (simple: boolean, tapes: readonly WordmarkTapeT[]) => {
	const hostRef = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(false);
	useEffect(() => {
		const host = hostRef.current;
		if (!host) return;
		setReady(false);
		host.dataset.wordmarkState = simple ? 'simple' : 'waiting';
		if (simple) return;
		let scene: WordmarkSceneT | null = null;
		let disposed = false;
		let pending = false;
		let visible = false;
		let failed = false;
		const initialize = async () => {
			if (simple || !visible || scene || pending || disposed || failed) return;
			pending = true;
			host.dataset.wordmarkState = 'loading';
			try {
				const [{ createWordmarkScene }] = await Promise.all([
					import('./wordmark-scene'),
					document.fonts.load('850 100px Nunito')
				]);
				if (disposed) return;
				scene = createWordmarkScene(
					host,
					{
						onReady: () => {
							if (!disposed) setReady(true);
						},
						onFallback: () => {
							if (!disposed) {
								failed = true;
								setReady(false);
							}
						}
					},
					tapes
				);
				scene.setActive(visible);
			} catch {
				failed = true;
				if (!disposed) host.dataset.wordmarkState = 'fallback';
			} finally {
				pending = false;
			}
		};
		const observer = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				host.dataset.wordmarkVisible = String(visible);
				scene?.setActive(visible);
				void initialize();
			},
			{ rootMargin: '80px' }
		);
		observer.observe(host);
		return () => {
			disposed = true;
			observer.disconnect();
			scene?.dispose();
		};
	}, [simple, tapes]);

	return { hostRef, ready };
};
