type PropsT = { id: string; json: unknown };

// React serializes script text safely, including embedded closing-script strings.
const StructuredDataScript = ({ id, json }: PropsT) => (
	<script id={id} type="application/ld+json">
		{JSON.stringify(json)}
	</script>
);

export default StructuredDataScript;
