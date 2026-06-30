// frontend/src/pages/PublishedPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PublishedPage() {
  const { slug } = useParams();
  const [html, setHtml] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/share/${slug}`);
      const text = await res.text();
      setHtml(text);
    };
    fetch();
  }, [slug]);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
