import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHashtag } from 'react-icons/fa';
import './SectionHeading.scss';

const SectionHeading = ({ level = 2, id, children, className = '' }) => {
    const location = useLocation();
    const [showCopied, setShowCopied] = useState(false);

    // Generate ID from text if not provided (simple slugify, risky with bilingual)
    // Ideally id is passed explicitly
    const safeId = id || (typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '');

    const Tag = `h${level}`;

    const handleCopyLink = (e) => {
        e.preventDefault();

        const origin = window.location.origin;
        const pathname = window.location.pathname;
        const fullUrl = `${origin}${pathname}#${safeId}`;

        navigator.clipboard.writeText(fullUrl).then(() => {
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);

            // Update URL without reload
            window.history.pushState({}, '', fullUrl);

            // Scroll to element
            const element = document.getElementById(safeId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    };

    return (
        <Tag id={safeId} className={`section-heading ${className}`}>
            {children}
            <a
                href={`#${safeId}`}
                className="heading-anchor"
                onClick={handleCopyLink}
                aria-label="Copy link to this section"
            >
                <FaHashtag />
                {showCopied && <span className="copied-tooltip">Copied!</span>}
            </a>
        </Tag>
    );
};

export default SectionHeading;
