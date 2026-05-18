import Link from 'next/link';
import { useContactModal } from '../../contexts/ContactModalContext';

function isContactUsHref(href) {
    if (!href || typeof href !== 'string') return false;
    const h = href.trim();
    if (h === '/contact-us') return true;
    if (/^https?:\/\/(www\.)?appzoro\.com\/?contact-us\/?$/i.test(h)) return true;
    return false;
}

/**
 * Renders a link to internal URLs, but `/contact-us` opens the global contact modal
 * (full page is reserved for main nav). Use for CTAs, footer, service blocks, etc.
 */
export default function ContactHref({ href, className, children, prefetch, ...rest }) {
    const { openContactModal } = useContactModal();
    const target = href || '/contact-us';

    if (isContactUsHref(target)) {
        return (
            <a
                href="#"
                className={className}
                onClick={(e) => {
                    e.preventDefault();
                    openContactModal();
                }}
                {...rest}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={target} className={className} prefetch={prefetch} {...rest}>
            {children}
        </Link>
    );
}
