import React from 'react';
import styled from '@emotion/styled';

const WebViewContainer = styled.div`
  flex-grow: 1;
`;

export default function WebView({ url }) {
  return (
    <WebViewContainer>
      <webview src={url} style={{ width: '100%', height: '100%' }}></webview>
    </WebViewContainer>
  );
}