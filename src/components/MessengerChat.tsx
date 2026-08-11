"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: any;
  }
}

declare module "react" {
  interface HTMLAttributes<T> extends React.DOMAttributes<T> {
    attribution?: string;
    page_id?: string;
  }
}

export function MessengerChat() {
  const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID;

  useEffect(() => {
    if (!pageId) return;

    // Initialize Facebook SDK callback
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v18.0",
      });
    };

    // Asynchronously load Facebook SDK script
    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
      const fjs = d.getElementsByTagName(s)[0];
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      } else {
        d.head.appendChild(js);
      }
    })(document, "script", "facebook-jssdk");
  }, [pageId]);

  if (!pageId) return null;

  return (
    <>
      <div id="fb-root" />
      <div
        className="fb-customerchat"
        attribution="biz_inbox"
        page_id={pageId}
      />
    </>
  );
}

export default MessengerChat;
