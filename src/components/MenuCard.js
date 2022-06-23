import { ChevronRightRounded } from "@mui/icons-material";

function MenuCard({ imgSrc, name }) {
  return (
    <>
      <div className="imgBox">
        <img src={imgSrc} alt="" />
      </div>
      <h3>{name}</h3>
      <i className="loadMenu">
        <ChevronRightRounded />
      </i>
    </>
  );
}

export default MenuCard;
