export default function Button(props: {
  type: any;
  content: any;
  onClick: any;
  style: any;
  className: any;
  disabled: any;
}) {
  const Content = props.content;
  const OnClick = props.onClick;
  const Style = props.style;
  const Class = props.className;
  const Disabled = props.disabled;
  const Type = props.type;

  return (
    <button
      onClick={OnClick}
      style={Style}
      className={`btn ${Class}`}
      disabled={Disabled}
      type={Type}
    >
      {Content}
    </button>
  );
}
