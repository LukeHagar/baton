import { deleteTarget, getTarget } from '$lib/server/targets';
import { error, json } from '@sveltejs/kit';

export async function DELETE({ params }) {
	if (!params.id) {
		return error(400, { message: 'Missing targetId' });
	}

	const Target = await getTarget(Number(params.id));

	if (!Target) {
		return error(404, { message: `Target with id ${params.id} not found` });
	}

	try {
		await deleteTarget(Target.id);
		return json({ message: 'Target deleted successfully' });
	} catch (err) {
		console.error(err);
		return error(500, { message: `Failed to delete Target: ${err}` });
	}
}
