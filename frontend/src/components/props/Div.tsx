export function Div(props: {
  className: any;
  content: any;
  onClick: any;
  style: any;
}) {
  const Class = props.className;
  const Content = props.content;
  const OnClick = props.onClick;
  const Style = props.style;

  return (
    <div className={Class} onClick={OnClick} style={Style}>
      {Content}
    </div>
  );
}
