import { isFollwingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
	params: {
		username: string;
	};
}

export default async function UserPage({ params }: UserPageProps) {
	const user = await getUserByUsername(params.username);

	if (!user || !user.stream) notFound();

	const isFollowingData = isFollwingUser(user.id);
	const isBlockedData = isBlockedByUser(user.id);
	const [isFollowing, isBlocked] = await Promise.all([
		isFollowingData,
		isBlockedData,
	]);

	if (isBlocked) notFound();

	return (
		<StreamPlayer
			user={user}
			stream={user.stream}
			isFollowing={isFollowing}
		/>
	);
}
