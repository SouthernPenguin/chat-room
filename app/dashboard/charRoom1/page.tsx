'use client';
import { Button, ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { theme } from 'antd';

const CharRoom1 = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    // setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div
        onClick={() => toggleDarkMode()}
        className="bg--background dark:bg-black dark:text-white"
        style={{ width: '100px', height: '100px' }}
      >
        改变主题
      </div>
      <Button>ann </Button>
    </>
  );
};

export default CharRoom1;
