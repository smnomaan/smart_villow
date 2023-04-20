import { useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";

import DropDown from "../DropDown";
import { SearchContext } from "../../IndexSearchInput";

import { setListingType } from "../../../../store/searchFilters";

import "./HomeListingType.scss";

export const HomeListingType = () => {
  const dispatch = useDispatch();
  const { searchWord, term } = useContext(SearchContext);

  const [selectedOption, setSelectedOption] = useState(""); // ["for-sale", "for-rent"

  useEffect(() => {
    const storedListingType = localStorage.getItem("listingType");

    if (storedListingType) {
      setSelectedOption(storedListingType);
    } else {
      setSelectedOption("For Sale");
    }
  }, []);

  function handleOnChangeRadioBtn(e) {
    e.stopPropagation();
    const listingType = e.target.name;

    setSelectedOption(listingType);
    dispatch(setListingType(listingType));
  }

  return (
    <DropDown buttonValue={"For " + selectedOption}>
      <div htmlFor="for-sale" className="lbl">
        <input
          type="radio"
          id="for-sale"
          name="Sale"
          value="For Sale"
          checked={selectedOption === "Sale"}
          onChange={handleOnChangeRadioBtn}
        />
        <span>For Sale</span>
      </div>
      <div htmlFor="for-rent" className="lbl">
        <input
          type="radio"
          id="for-rent"
          // Clean up search word for request
          name="Rent"
          value="For Rent"
          onChange={handleOnChangeRadioBtn}
          checked={selectedOption === "Rent"}
        />
        <span>For Rent</span>
      </div>
    </DropDown>
  );
};
