import { createHash } from 'node:crypto';
import { SITE_URL, UHA_AGENT_SKILL } from '@agents';

export const GET = () => {
	const digest = createHash('sha256').update(UHA_AGENT_SKILL).digest('hex');

	return Response.json({
		$schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
		skills: [
			{
				name: 'uha-web',
				type: 'skill-md',
				description:
					'Public discovery skill for Uha app information, pricing, install links, and MCP endpoint routing.',
				url: `${SITE_URL}/.well-known/agent-skills/uha-web/SKILL.md`,
				digest: `sha256:${digest}`
			}
		]
	});
};
