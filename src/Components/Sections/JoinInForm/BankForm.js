import React, { useState, useRef } from 'react';
import axios from 'axios';
// import {cr} from 'chargebee'
// import {configure} from 'chargebee'

function BankForm() {
  const iframeRef = useRef(null);
  // var chargebee = configure({
  //   site: 'moufit',
  //   api_key: 'live_X3yDpiAvUbEanxO3y6N5TItxrcunaCiSK'
  // })

  // console.log(chargebee)
  // const handleIframeLoad = () => {
  //   const iframe = iframeRef.current;
  //   if (iframe) {
  //     const iframeWindow = iframe.contentWindow || iframe.contentDocument.defaultView;
  //     iframeWindow.postMessage({ type: 'CHARGEBEE_OPEN_CHECKOUT' }, '*');
  //   }
  // };

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const iframeWindow = iframe.contentWindow || iframe.contentDocument.defaultView;
      iframeWindow.addEventListener('message', handleMessage);
      iframeWindow.postMessage({ type: 'CHARGEBEE_OPEN_CHECKOUT' }, '*');
    }
  };
  
  const handleMessage = (event) => {
    if (event.data.type === 'CHARGEBEE_CHECKOUT_COMPLETE') {
      // Handle checkout completion
      const checkoutData = event.data.checkoutData;
      console.log(checkoutData);
    }
  };

  return (
    <div className="App">
      <h1>Chargebee Form</h1>
      <iframe
        src="https://moufit.chargebee.com/hosted_pages/plans"

  // src="https://your-chargebee-site.chargebee.com/hosted_pages/plans"
  title="Chargebee Checkout"
  ref={iframeRef}
  onLoad={handleIframeLoad}
  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
/>
      {/* <iframe
        src="https://moufit.chargebee.com/hosted_pages/plans"
        title="Chargebee Checkout"
        ref={iframeRef}
        onLoad={handleIframeLoad}
      /> */}
    </div>
  );
}

export default BankForm;


