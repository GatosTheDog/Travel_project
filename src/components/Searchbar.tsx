import React, { useContext, useState } from "react";
import "./Searchbar.css";
import { fetchData } from "../api/fetchData";
import { Package } from "../screens/PackagesScreen";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-datepicker";
import { AppContext } from '../AppContext';

import "react-datepicker/dist/react-datepicker.css";

interface SearchComponentProps {
  onSearchResults: (filteredData: Package[]) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearchResults,
}) => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);

  const [startDate, setStartDate] = useState<any>(new Date());
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('SomeChildComponent must be used within an AppProvider');
  }

  const handleSearch = async () => {
    try {
      const filteredData = context.data.filter((item: any) => {
        if (location === "") {
          return item;
        }
        const matchesLocation = item.city === location;
        return matchesLocation;
      });

      onSearchResults(filteredData); // Pass the filtered data to the parent component
      console.log(location);
      console.log("Filtered Data:", filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Προορισμός Ελλάδα"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="datePickerContainer">
        <div>|</div>
        <DatePicker
          className="datePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <div>|</div>
        <DatePicker
          className="datePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <div>|</div>
      </div>
      <input
        className="search-guests"
        type="number"
        min="1"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
      />
      <button className="search-button" onClick={handleSearch}>
        Αναζήτηση
      </button>
    </div>
  );
};

export default SearchComponent;
