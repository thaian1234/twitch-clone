import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/steam-service";
import { ToggleCard } from "./_components/toggle-card";

export default async function ChatPage() {
	const self = await getSelf();
	const steam = await getStreamByUserId(self.id);

	if (!steam) throw new Error("Stream not found");

	return (
		<div className="p-6">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">Chat settings</h1>
			</div>
			<div className="space-y-4">
				<ToggleCard
					field="isChatEnabled"
					label="Enable chat"
					value={steam.isChatEnabled}
				/>
				<ToggleCard
					field="isChatDelayed"
					label="Delay chat"
					value={steam.isChatDelayed}
				/>
				<ToggleCard
					field="isChatFollowersOnly"
					label="Must be follwing to chat"
					value={steam.isChatFollowersOnly}
				/>
			</div>
		</div>
	);
}
