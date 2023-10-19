export function Tags(props: {
  tag: any;
  className: any;
  content: any;
  key: any;
  onClick: any;
  loading: any;
  src: any;
}) {
  const TagName = props.tag;
  const Class = props.className;
  const Content = props.content;
  const Key = props.key;
  const OnClick = props.onClick;
  const Loading = props.loading;
  const Src = props.src;

  return (
    <TagName
      className={Class}
      key={Key}
      onClick={OnClick}
      loading={Loading}
      src={Src}
    >
      {Content}
    </TagName>
  );
}
