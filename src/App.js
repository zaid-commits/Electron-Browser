import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import AddressBar from './components/AddressBar';
import NavigationButtons from './components/NavigationButtons';
import Sidebar from './components/Sidebar';
import WebView from './components/WebView';
import ThemeToggle from './components/ThemeToggle';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme === 'dark' ? '#333' : '#fff'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${props => props.theme === 'dark' ? '#444' : '#f0f0f0'};
`;

export default function App() {
  const [currentURL, setCurrentURL] = useState('https://www.example.com');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    window.electronAPI.getTheme().then(savedTheme => setTheme(savedTheme));
  }, []);

  const handleURLChange = async (url) => {
    const loadedURL = await window.electronAPI.loadURL(url);
    setCurrentURL(loadedURL);
    window.electronAPI.addToHistory(loadedURL);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.electronAPI.setTheme(newTheme);
  };

  return (
    <AppContainer theme={theme}>
      <Sidebar theme={theme} />
      <MainContent>
        <TopBar theme={theme}>
          <NavigationButtons onURLChange={setCurrentURL} theme={theme} />
          <AddressBar currentURL={currentURL} onURLChange={handleURLChange} theme={theme} />
          <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        </TopBar>
        <WebView url={currentURL} />
      </MainContent>
    </AppContainer>
  );
}