"use client";

import { createIngress } from "@/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export function ConnectModal() {
	const closeRef = useRef<ElementRef<"button">>(null);
	const [ingressType, setIngressType] = useState<IngressType>(RTMP);
	const [isPending, startTransition] = useTransition();

	const onSubmit = () => {
		startTransition(() => {
			createIngress(parseInt(ingressType))
				.then(() => {
					toast.success("Ingress created");
					closeRef.current?.click();
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="primary">Generate connection</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate connection</DialogTitle>
				</DialogHeader>
				<Select
					value={ingressType}
					onValueChange={(value) => setIngressType(value)}
					disabled={isPending}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Ingress Type" />
						<SelectContent className="border border-white">
							<SelectItem value={RTMP}>RTMP</SelectItem>
							<SelectItem value={WHIP}>WHIP</SelectItem>
						</SelectContent>
					</SelectTrigger>
				</Select>
				<Alert variant="destructive" className="font-bold">
					<AlertTriangle className="size-4" />
					<AlertTitle>Warning!</AlertTitle>
					<AlertDescription>
						This action will reset all active streams using the
						current connection
					</AlertDescription>
				</Alert>
				<div className="flex justify-between">
					<DialogClose ref={closeRef} asChild>
						<Button variant="destructive">Cancel</Button>
					</DialogClose>
					<Button
						onClick={onSubmit}
						disabled={isPending}
						variant="primary"
					>
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
