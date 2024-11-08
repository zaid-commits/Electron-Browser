import React from 'react';
import styled from '@emotion/styled';

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  background-color: ${props => props.theme === 'dark' ? '#555' : '#e0e0e0'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#666' : '#d0d0d0'};
  }
`;

export default function NavigationButtons({ onURLChange, theme }) {
  const handleBack = async () => {
    const success = await window.electronAPI.goBack();
    if (success) {
      const currentURL = await window.electronAPI.getCurrentURL();
      onURLChange(currentURL);
    }
  };

  const handleForward = async () => {
    const success = await window.electronAPI.goForward();
    if (success) {
      const currentURL = await window.electronAPI.getCurrentURL();
      onURLChange(currentURL);
    }
  };

  const handleRefresh = () => {
    window.electronAPI.refresh();
  };

  return (
    <ButtonContainer>
      <Button onClick={handleBack} theme={theme}>Back</Button>
      <Button onClick={handleForward} theme={theme}>Forward</Button>
      <Button onClick={handleRefresh} theme={theme}>Refresh</Button>
    </ButtonContainer>
  );
}