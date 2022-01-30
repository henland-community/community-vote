import { useEffect, useState } from 'react';




export const DarkModeToggle = ({...props}) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  function toggleTheme(newmode: string) {
    localStorage.setItem('theme', newmode);
    setTheme(newmode);
    if (newmode === 'system')
      newmode = getSystemTheme()
    let root = document.documentElement;
    while (root.classList.length > 0)
      root.classList.remove(root.classList[0]);
    root.classList.add('mode-'+newmode);
  }
  
  const ModeToggle = ({...props}) => {
    return (
      <button {...props}
      onClick={()=>{ toggleTheme(props.mode) }}
      className={ `mode-${props.mode}-toggle` }
      title={ props.title }
      disabled={ theme === props.mode }
    >{ props.emoji }</button>
    )
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  return (
    <>
      <ModeToggle
        mode="light"
        title="Light Mode"
        emoji="🌞"
        theme={ theme }
      />
      <ModeToggle
        mode="dark"
        title="Dark Mode"
        emoji="😎"
        theme={ theme }
      />
      <ModeToggle
        mode="matrix"
        title="h=nter the Matrix"
        emoji="🕴"
        theme={ theme }
      />
      <ModeToggle
        mode="uwu"
        title="uwu owo"
        emoji="🎀"
        theme={ theme }
      />
      <ModeToggle
        mode="system"
        title="Use device default theme"
        emoji="💻"
        theme={ theme }
      />
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