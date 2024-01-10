"use client";

import { cn } from "@/lib/utils";
import { useCreatorSiderbar } from "@/store/use-creator-sidebar";
import { ReactNode } from "react";

interface WrapperProps {
	children: ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
	const { collapsed } = useCreatorSiderbar((state) => state);

	return (
		<aside
			className={cn(
				"fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background boder-r border-[#2D2E35] z-50",
				collapsed && "lg:w-[70px]"
			)}
		>
			{children}
		</aside>
	);
}
