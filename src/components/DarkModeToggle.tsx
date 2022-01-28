import { useEffect, useState } from 'react';

export const DarkModeToggle = ({...props}) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  function toggleTheme(newmode: string) {
    localStorage.setItem('theme', newmode);
    setTheme(newmode);
    if (newmode === 'system')
      newmode = getSystemTheme()
    document.getElementsByTagName('html')[0].classList.remove('mode-light');
    document.getElementsByTagName('html')[0].classList.remove('mode-dark');
    document.getElementsByTagName('html')[0].classList.add('mode-'+newmode);
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  return (
    <>
      <button {...props}
        onClick={()=>{ toggleTheme('light') }}
        className={ `mode-light-toggle` }
        disabled={ theme === 'light' }
        title="Light Mode"
      >🌞</button>
      <button {...props}
        onClick={()=>{ toggleTheme('dark') }}
        className={ `mode-dark-toggle` }
        disabled={ theme === 'dark' }
        title="Dark Mode"
      >😎</button>
      <button {...props}
        onClick={()=>{ toggleTheme('system') }}
        className={ `mode-system-toggle` }
        disabled={ theme === 'system' }
        title="System Default"
      >💻</button>
    </>
  );
};

function getSystemTheme() {
  let theme = 'light'
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    theme = 'dark';
  return theme;
}

export const DarkModeLoader = ({...props}) => {
  let loadmode = localStorage.getItem('theme') || 'system';
  if (loadmode === 'system')
    loadmode = getSystemTheme()

  document.getElementsByTagName('html')[0].classList.add('mode-'+loadmode);
  return <></>
}