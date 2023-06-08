import React from "react";
import axios from "axios";
import {
	Modal,
	ModalContent,
	ModalOverlay,
	Progress,
} from "@chakra-ui/react";

function App() {
	const form = React.useRef<HTMLFormElement>(null);
	const [response, setResponse] = React.useState("");
	const [processing, setProcessing] = React.useState(false);
	const [error, setError] = React.useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (form.current === null) return;
		setProcessing(true);

		const formdata = new FormData(form.current);

		axios
			.post("http://localhost:5000/ai", formdata)
			.then(({data}) => {
				setResponse(data);
				setProcessing(false);
			})
			.catch(() => {
				setError(true);
			})
	}

	return (
		<div>
			<p className="text-4xl font-bold text-center p-4 border-b">Custom GPT</p>
			<div className="p-4 m-4 border border-slate-200 rounded-xl bg-white">
				<p className="text-slate-500 font-bold">Enter Prompt</p>
				<form onSubmit={handleSubmit} ref={form}>
					<input
						name="prompt"
						placeholder="Ask anything and press enter..."
						className="focus:outline-none rounded-xl border p-4 mt-2 w-full px-6"
					/>
				</form>
			</div>
			{
				response !== "" && (
					<div className="p-4 m-4 border border-slate-200 shadow-lg rounded-xl bg-white">
						<p className="text-slate-500 font-bold">Response</p>
						<div className="border border-slate-300 p-4 rounded-xl mt-4">
							{JSON.stringify(response)}
						</div>
					</div>
				)
			}
			{
				processing && (
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					<Modal isOpen onClose={() => {
					}}>
						<ModalOverlay/>
						<ModalContent>
							<div className="p-4">
								{
									error ?
										(
											<div>
												<p className="text-2xl font-bold">Error</p>
												<p className="mt-4 text-red-400 p-4 bg-red-100 rounded-lg">Internal Server Error Occured. Check
													console</p>
											</div>
										) : (
											<>
												<p className="mb-2">Processing your query...</p>
												<Progress size='sm' isIndeterminate/>
											</>
										)
								}
							</div>
						</ModalContent>
					</Modal>
				)
			}
		</div>
	)
}

export default App
