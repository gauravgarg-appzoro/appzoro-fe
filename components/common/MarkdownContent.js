import dynamic from 'next/dynamic';
import { useClientMounted } from '../../lib/useClientMounted';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

/**
 * Renders markdown after hydration; SSR shows plain text (or HTML) for crawlability.
 */
export default function MarkdownContent({ content, className, as: Tag = 'div' }) {
  const mounted = useClientMounted();
  if (!content) return null;

  const isHtml = /<[a-z][\s\S]*>/i.test(String(content));

  if (!mounted) {
    if (isHtml) {
      return <Tag className={className} dangerouslySetInnerHTML={{ __html: String(content) }} />;
    }
    return <Tag className={className}>{String(content)}</Tag>;
  }

  return (
    <Tag className={className}>
      <ReactMarkdown>{String(content)}</ReactMarkdown>
    </Tag>
  );
}
