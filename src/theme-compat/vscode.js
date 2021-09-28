let CSS;

export const add = async (theme) => {
  CSS = await import(`https://polyglot-mod.github.io/standard/src/css.js?_${Date.now()}`);

  // const theme = await (await fetch(url)).json();

  CSS.add(`.theme-dark, .theme-light {
    --background-primary: ${theme.colors['editor.background']}; /* Main editor background */
    --background-secondary: ${theme.colors['sideBar.background']}; /* Sidebar (left or right with file explorer, etc.) */
    --background-secondary-alt: ${theme.colors['editorIndentGuide.background']};
    --background-tertiary: ${theme.colors['activityBar.background']};
  
    --channeltextarea-background: var(--background-tertiary);
  
    --background-accent: ${theme.colors['input.background']}; /* Background for inputs */
    --background-floating: ${theme.colors['button.secondaryBackground']}; /* Background for buttons */
  
    --brand-experiment: ${theme.colors['textLink.foreground']}; /* Background for links */
  
    --text-link: var(--brand-experiment);
    --text-normal: ${theme.colors['editor.foreground']}; /* Foreground for main editor */
    --text-muted: ${theme.colors['statusBar.foreground']};
    --interactive-normal: ${theme.colors['descriptionForeground']}; /* Foreground for descriptions */
    --interactive-hover: var(--text-normal);
    --interactive-active: ${theme.colors['settings.headerForeground']}; /* Foreground for headers */
    --interactive-muted: var(--text-muted);
  }`);
};

export const remove = () => {
  CSS.remove();
};