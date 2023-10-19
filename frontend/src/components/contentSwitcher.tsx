import ContentSwitcher from "./contentSwitcher";
import "./Style-modules/contentWrapper-style-module.css";

function ContentWrapper({ user }: { user: any }) {
  return (
    <div className="ContentWrapper">
      <ContentSwitcher user={user} />
    </div>
  );
}

export default ContentWrapper;
