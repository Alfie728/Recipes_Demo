export function classNameStyled(classNames, styles, preClassNames) {
  const classList = classNames ? classNames.split(' ') : [];
  const preClassList = preClassNames ? preClassNames.split(' ') : [];

  const classListStyled = classList.map(className => styles[className] || className);
  const preClassListStyled = preClassList.map(className => styles[className] || className);

  return [...preClassListStyled, ...classListStyled].join(' ');
}