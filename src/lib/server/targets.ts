import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTarget(name: string, url: string) {
	return await prisma.relayTarget.create({
		data: {
			name,
			url
		}
	});
}

export async function listTargets() {
	return await prisma.relayTarget.findMany();
}

export async function deleteTarget(id: number) {
	return await prisma.relayTarget.delete({
		where: {
			id
		}
	});
}

export async function getTarget(id: number) {
	return await prisma.relayTarget.findUnique({
		where: {
			id
		}
	});
}
