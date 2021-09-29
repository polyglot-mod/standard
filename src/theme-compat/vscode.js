let CSS;

export const add = async (theme) => {
  if (typeof theme === 'string') theme = await (await fetch(theme)).json(); // If url (string) is given, get it's JSON

  theme.tokenColors = theme.tokenColors.map((x) => { // Standardise token color scopes (string -> array)
    if (typeof x.scope === 'string') {
      x.scope = x.scope.split(',').map((y) => y.trim());
    }

    return x;
  });

  const findTokenColor = (scopeSegment) => theme.tokenColors.find((x) => x.scope.includes(scopeSegment));


  CSS = await import(`https://polyglot-mod.github.io/standard/src/css.js?_${Date.now()}`);

  CSS.add(`.theme-dark, .theme-light {
    --background-primary: ${theme.colors['editor.background']}; /* Main editor background */
    --background-secondary: ${theme.colors['sideBar.background']}; /* Sidebar (left or right with file explorer, etc.) */
    --background-secondary-alt: ${theme.colors['input.background']};
    --background-tertiary: ${theme.colors['activityBar.background']};
  
    --channeltextarea-background: var(--background-secondary-alt);
  
    --background-accent: ${theme.colors['editorIndentGuide.background']}; /* Background for inputs */
    --background-floating: ${theme.colors['button.secondaryBackground']}; /* Background for buttons */
  
    --brand-experiment: ${theme.colors['textLink.foreground']}; /* Background for links */
  
    --text-link: var(--brand-experiment);
    --text-normal: ${theme.colors['editor.foreground']}; /* Foreground for main editor */
    --text-muted: ${findTokenColor('comment').settings.foreground};
    --interactive-normal: ${theme.colors['descriptionForeground']}; /* Foreground for descriptions */
    --interactive-hover: var(--text-normal);
    --interactive-active: ${theme.colors['settings.headerForeground']}; /* Foreground for headers */
    --interactive-muted: var(--text-muted);
  }`);
};

export const remove = () => {
  CSS.remove();
};