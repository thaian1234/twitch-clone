"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CopyButtonProps {
	value: string;
}

export function CopyButton({ value }: CopyButtonProps) {
	const [isCopied, setIsCopied] = useState(false);

	const onCopy = () => {
		if (!value) return;

		setIsCopied(true);
		navigator.clipboard.writeText(value);

		setTimeout(() => {
			setIsCopied(false);
			toast.success("Copied success");
		}, 1000);
	};

	const Icon = isCopied ? CheckCheck : Copy;

	return (
		<Button
			onClick={onCopy}
			disabled={!value || isCopied}
			variant="ghost"
			size="sm"
		>
			<Icon aria-label="copy" className="size-4" />
		</Button>
	);
}
