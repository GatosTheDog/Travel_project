import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import SearchComponent from "../components/Searchbar";
import OfferCard from "../components/OfferCard";
import { fetchData } from "../api/fetchData";
import "./PackagesScreen.css";
import FilterComponent from "../components/FilterComponent";

export interface Package {
  name: string;
  rating: number;
  meal_plan: string;
  city: string;
  price: number;
  photo: string;
}

export const PackagesScreen = () => {
  const [data, setData] = useState<Package[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("default");
  const [activeTab, setActiveTab] = useState("excursions");

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const handleSearchResults = (filteredData: Package[]) => {
    setData(filteredData); // Update the state with filtered data
  };

  const handleFilterResults = (filteredData: Package[]) => {
    setData(filteredData); // Update the state with filtered data
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(event.target.value);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const sortedData = [...data].sort((a, b) => {
    switch (sortMethod) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0; // No sorting
    }
  });

  return (
    <div className="pattern-background">
      <div className="title">
        <Breadcrumbs />
        <div className="height1">ΕΛΛΑΔΑ</div>
        <div className="text-14">Πακετα-Προσφορες</div>
      </div>
      <div className="switch-button">
        <div
          className={`button ${activeTab === "excursions" ? "active" : ""}`}
          onClick={() => setActiveTab("excursions")}
        >
          Εκδρομές
        </div>
        <div
          className={`button ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => setActiveTab("hotels")}
        >
          Ξενοδοχεία
        </div>
      </div>
      <div className="searchBar">
        <SearchComponent onSearchResults={handleSearchResults} />
      </div>
      <div className="packs-dropdown">
        <div className="packs">
          <span style={{ fontWeight: 700, marginRight: 5 }}>
            {data.length}{" "}
          </span>
          διαθέσιμα πακετα διακοπων
        </div>
        <div>
          <div className="mobile-filter">
            <div className="filter-button" onClick={toggleModal}>
              Filters
            </div>
            <div className="dropdown">
              <select className="sortButton" onChange={handleSortChange}>
                <option value="default">Sort by</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="filterBar">
          <FilterComponent onFilterResults={handleFilterResults} />
        </div>
        <div className="buttonContainer">
          <>
            <div className="cardContainer">
              {sortedData.map((packageData, i) => (
                <OfferCard
                  key={i}
                  imageUrl={packageData.photo}
                  days={Math.floor(Math.random() * (7 - 1 + 1) + 1)}
                  hotelName={packageData.name}
                  location={packageData.city}
                  price={packageData.price}
                  currency="€"
                />
              ))}
            </div>
            <div>
              <button className="moreButton">Δειτε Περισσοτερα</button>
            </div>
          </>
        </div>
      </div>
      <div className="promo-card">
        <img src={require("../images/islandPic.jpeg")} alt="Promotion" />
        <div className="textAndButton">
          <div
            style={{
              fontSize: 30,
              color: "white",
              fontWeight: 600,
              letterSpacing: 0.05,
            }}
          >
            ΔΕΝ ΒΡΗΚΑΤΕ ΑΥΤΟ ΠΟΥ ΨΑΧΝΑΤΕ;
          </div>
          <button className="imageButton">Επικοινωνήστε μαζί μας</button>
        </div>
      </div>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
              <FilterComponent onFilterResults={handleFilterResults} />
            </div>
        </div>
      )}
    </div>
  );
};
