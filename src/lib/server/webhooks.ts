import { writable } from "svelte/store";
import { prisma } from "./prisma";

export const newWebhooks = writable<boolean>(true);

export async function handleWebhook(req: Request) {
	const headers = JSON.stringify(Object.fromEntries([...req.headers]));
	const url = new URL(req.url);

	let cleanedPath = url.pathname.replace('/ingest', '');
	if (cleanedPath === '') {
		cleanedPath = '/';
	}
	console.log(cleanedPath);

	const webhook = await prisma.webhook.create({
		data: {
			headers,
			method: req.method,
			path: cleanedPath + url.search,
			body: await req.text()
		}
	});

	console.log(webhook);
	newWebhooks.set(true);
}

export async function listWebhooks() {
	return await prisma.webhook.findMany();
}

export async function deleteWebhook(id: number) {
	return await prisma.webhook.delete({
		where: {
			id
		}
	});
}

export async function getWebhook(id: number) {
	return await prisma.webhook.findUnique({
		where: {
			id
		}
	});
}

export async function clearWebhooks() {
	return await prisma.webhook.deleteMany();
}