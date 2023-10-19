import { NavLink } from "react-router-dom";

const MenuItem = ({ items, transformLabel = "uppercase" }) => {
  return items.map((item, index) => (
    <li key={item.label}>
      <NavLink to={item.link} key={index} className={item.Aclass}>
        <i className={item.icon}></i>
        <span>
          {transformLabel === "uppercase"
            ? item.label.toUpperCase()
            : item.label.toLowerCase()}{" "}
          {/* Transform label based on prop */}
        </span>
      </NavLink>
    </li>
  ));
};

export default MenuItem;
