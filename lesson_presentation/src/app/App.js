import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Heading, FullWidthContentSection } from '../ui';

export const App = () => {
  const [eventListenerAdded, setEventListenerAdded] = useState(false);

  const messageHandler = (event) => {
    console.log('onMessageReceivedFromIframe', event);
  };

  useEffect(() => {
    window.addEventListener('message', messageHandler, false);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <FullWidthContentSection>
      <Heading>Lesson Presentation Demo</Heading>
      <div>POST Message Container</div>
      <Divider />
      <div>test</div>
    </FullWidthContentSection>
  );
};
