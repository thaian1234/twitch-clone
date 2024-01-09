"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
	// TODO: Disconect nguoi dung khoi livestream
	// TODO: Cho phep nguoi dung kick khach khoi livestream
	const blockedUser = await blockUser(id);

	revalidatePath("/");

	if (blockedUser) revalidatePath(`/${blockedUser.blocked.username}`);

	return blockedUser;
};

export const onUnblock = async (id: string) => {
	const unblockedUser = await unblockUser(id);

	revalidatePath("/");

	if (unblockedUser) revalidatePath(`/${unblockedUser.blocked.username}`);

	return unblockedUser;
};
