import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
	try {
		const selfData = getSelf();
		const otherUserData = db.user.findUnique({
			where: {
				id,
			},
		});

		const [self, otherUser] = await Promise.all([selfData, otherUserData]);

		if (!otherUser) throw new Error("User not found");

		if (otherUser.id === self.id) return false;

		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: otherUser.id,
					blockedId: self.id,
				},
			},
		});

		return !!existingBlock;
	} catch (error) {
		return false;
	}
};

export const blockUser = async (id: string) => {
	const selfData = getSelf();
	const otherUserData = db.user.findUnique({
		where: {
			id,
		},
	});

	const [self, otherUser] = await Promise.all([selfData, otherUserData]);

	if (self.id === id) throw new Error("Cannot block yourself");

	if (!otherUser) throw new Error("User not found");

	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});

	if (existingBlock) throw new Error("Already blocked");

	const block = await db.block.create({
		data: {
			blockerId: self.id,
			blockedId: otherUser.id,
		},
		include: {
			blocked: true,
		},
	});

	return block;
};

export const unblockUser = async (id: string) => {
	const selfData = getSelf();
	const otherUserData = db.user.findUnique({
		where: {
			id,
		},
	});

	const [self, otherUser] = await Promise.all([selfData, otherUserData]);

	if (self.id === id) throw new Error("Cannot unblock yourself");

	if (!otherUser) throw new Error("User not found");

	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});

	if (!existingBlock) throw new Error("Not blocked");

	const unblock = await db.block.delete({
		where: {
			id: existingBlock.id,
		},
		include: {
			blocked: true,
		},
	});

	return unblock;
};
