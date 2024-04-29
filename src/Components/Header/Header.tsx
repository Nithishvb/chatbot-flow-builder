import SaveBtn from "../Button/SaveBtn";

const Header = () => {
  return (
    <div className="bg-gray-300 p-3">
      <div className="flex justify-end">
        <SaveBtn />
      </div>
    </div>
  );
};

export default Header;
