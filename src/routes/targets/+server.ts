import { createTarget, listTargets } from '$lib/server/targets';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	return json(await listTargets());
}

export async function POST({ request }) {
	const data = await request.json();
	if (!data.name) {
		return error(400, { title: 'Missing name', message: 'Relay Target Name is required' });
	}

	if (!data.url) {
		return error(400, { title: 'Missing url', message: 'Relay Target URL is required' });
	}

	await createTarget(data.name, data.url);

	return new Response(null, {
		status: 201
	});
}