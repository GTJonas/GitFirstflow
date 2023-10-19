export function Form(props: { onSubmit: any; content: any; className: any }) {
  const OnSubmit = props.onSubmit;
  const Content = props.content;
  const Class = props.className;

  return (
    <form onSubmit={OnSubmit} className={Class}>
      {Content}
    </form>
  );
}
