"use cliet";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";

export function ChatToggle() {
	const { collapsed, onExpand, onCollapse } = useChatSidebar(
		(state) => state
	);

	const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

	const onToggle = () => {
		if (collapsed) {
			onExpand();
		} else {
			onCollapse();
		}
	};

	const label = collapsed ? "Expand" : "Collapsed";

	return (
		<Hint label={label} side="left" asChild>
			<Button
				onClick={onToggle}
				variant="ghost"
				className="h-auto p-2 hover:bg-white/10 hover:text-primary"
			>
				<Icon className="size-4" />
			</Button>
		</Hint>
	);
}
