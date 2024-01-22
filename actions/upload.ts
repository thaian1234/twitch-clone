"use server";

import { UTApi } from "uploadthing/server";
import { updateStream } from "./stream";

export const onDeleteFile = async (url: string | null) => {
	if (!url) throw new Error("Image URL is required");
	
	const key = url.substring(url.lastIndexOf("/") + 1);
	const utapi = new UTApi();

	await Promise.all([
		updateStream({ thumbnailUrl: null }),
		utapi.deleteFiles(key),
	]);
};
