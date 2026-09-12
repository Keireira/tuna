const assert = require('node:assert/strict');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { ServerInsertedHTMLContext } = require('next/navigation');
const { styled, version } = require('styled-components');
const { StyledComponentsRegistry } = require('../src/lib/registry.tsx');

test('streamed styles retain the metadata needed for client rehydration', () => {
	const Card = styled.div`
		color: rebeccapurple;
	`;
	let insertStyles;
	const html = renderToStaticMarkup(
		React.createElement(
			ServerInsertedHTMLContext.Provider,
			{ value: (callback) => (insertStyles = callback) },
			React.createElement(StyledComponentsRegistry, null, React.createElement(Card, null, 'Content'))
		)
	);
	assert.match(html, /Content/);
	assert.equal(typeof insertStyles, 'function');
	const styles = renderToStaticMarkup(insertStyles());
	assert.match(styles, /<style\b[^>]*\bdata-styled="/);
	assert.ok(styles.includes(`data-styled-version="${version}"`));
	assert.ok(styles.includes(Card.styledComponentId));
	assert.match(styles, /color:rebeccapurple/);
	assert.equal(renderToStaticMarkup(insertStyles()), '', 'flushed styles must not be emitted twice');
});
