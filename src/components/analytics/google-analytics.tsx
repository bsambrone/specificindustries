import Script from "next/script"

// Google Analytics with lazyOnload strategy — loads after the page is idle,
// keeping gtag.js off the critical request chain.
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        id="_next-ga"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="_next-ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
