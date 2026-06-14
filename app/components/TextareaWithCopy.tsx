import { Textarea } from "flowbite-react";
import { useState } from "react";

interface TextareaWithCopyProps {
    result: string;
    rows: number;
}

export function TextareaWithCopy({ result, rows }: TextareaWithCopyProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mb-4 w-full relative">
            <Textarea
                value={result}
                rows={rows}
                className="bg-gray-50 font-mono text-sm w-full pr-12"
                readOnly
            />
            {result && (
                <button
                    onClick={handleCopy}
                    className={`absolute top-2 right-2 flex items-center justify-center p-2 rounded-md transition-all duration-200 border ${
                        copied
                            ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                    }`}
                    title={copied ? '已复制' : '复制'}
                >
                    {copied ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    )
}