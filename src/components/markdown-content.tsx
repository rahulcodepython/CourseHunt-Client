import React from 'react'
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownContent = ({ content }: { content: string }) => {
    return (
        <article className="prose dark:prose-dark max-w-none prose-sm">
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {content}
            </Markdown>
        </article>
    )
}

export default MarkdownContent