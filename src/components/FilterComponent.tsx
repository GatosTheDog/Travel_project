import React, { useEffect, useState } from "react";
import "./FilterComponent.css";
import { fetchData } from "../api/fetchData";
import { Package } from "../screens/PackagesScreen";
import ReactSlider from "react-slider";

interface SearchComponentProps {
  onFilterResults: (filteredData: Package[]) => void;
}

const FilterComponent: React.FC<SearchComponentProps> = ({
  onFilterResults,
}) => {
  const [priceRange, setPriceRange] = useState<string>("");
  const [customRange, setCustomRange] = useState<any>([]);
  const [fromValue, setFromValue] = useState<number | undefined>(undefined);
  const [toValue, setToValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (
      priceRange ||
      (fromValue && toValue) ||
      (customRange[0] && customRange[1])
    ) {
      handleSearch();
    }
  }, [priceRange, fromValue, toValue, customRange]);

  const handleSearch = async () => {
    try {
      const { data } = await fetchData(); // Fetch all data
      let filteredData: Package[] = data;
      if (fromValue && toValue) {
        filteredData = filteredData.filter(
          (item) => item.price >= fromValue && item.price <= toValue
        );
      } else if (customRange[0] && customRange[1]) {
        filteredData = filteredData.filter(
          (item) => item.price >= customRange[0] && item.price <= customRange[1]
        );
      } else {
        switch (priceRange) {
          case "to50":
            filteredData = filteredData.filter((item) => item.price <= 50);
            break;
          case "50to150":
            filteredData = filteredData.filter(
              (item) => item.price > 50 && item.price <= 150
            );
            break;
          case "150to500":
            filteredData = filteredData.filter(
              (item) => item.price > 150 && item.price <= 500
            );
            break;
          default:
            // If no price range is selected, do not filter by price
            break;
        }
      }

      onFilterResults(filteredData); // Pass the filtered data to the parent component
      console.log("Filtered Data:", filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="filter-container">
      <div style={{fontSize:31,fontWeight:700}}>ΦΙΛΤΡΑ</div>
      <div className="range-section">
        <div style={{fontSize:20,fontWeight:700}}>ΕΥΡΟΣ ΤΙΜΗΣ</div>
        <div className="input-group">
          <label>
            <div className="small-text-12">Από</div>
            <input
              className="valueInput"
              type="number"
              placeholder="€"
              value={fromValue}
              onChange={(e) => {
                setFromValue(parseInt(e.target.value));
              }}
            />
          </label>
          <label>
            <div className="small-text-12">Έως</div>
            <input
              className="valueInput"
              type="number"
              placeholder="€"
              value={toValue}
              onChange={(e) => {
                setToValue(parseInt(e.target.value));
              }}
            />
          </label>
        </div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          defaultValue={[0, 500]}
          max={500}
          min={0}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
          renderThumb={(props: any, state: any) => (
            <div {...props}>{state.valueNow}</div>
          )}
          onAfterChange={(value, index) => setCustomRange(value)}
          pearling
          minDistance={10}
        />
      </div>
      <div className="price-range">
        <label className="custom-radio">
          Έως 50 €
          <input
            type="radio"
            name="price-range"
            value="to50"
            checked={priceRange === "to50"}
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
          />
          <span className="checkmark"></span>
        </label>
        <label className="custom-radio">
          50 - 150 €
          <input
            type="radio"
            name="price-range"
            value="50to150"
            checked={priceRange === "50to150"}
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
          />
          <span className="checkmark"></span>
        </label>
        <label className="custom-radio">
          150 - 500 €
          <input
            type="radio"
            name="price-range"
            value="150to500"
            checked={priceRange === "150to500"}
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="checkbox-section">
        <div className="titleFilter" style={{fontSize:20,fontWeight:700}}>
            ΦΙΛΤΡΟ
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <label className="custom-checkbox" key={index}>
            <input type="checkbox" /> Φίλτρο
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
      <div className="checkbox-section">
        <div className="titleFilter" style={{fontSize:20,fontWeight:700}}>ΦΙΛΤΡΟ</div>
        {Array.from({ length: 5 }).map((_, index) => (
          <label className="custom-checkbox" key={index}>
            <input type="checkbox" /> Φίλτρο
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
