import React from 'react';
import './OfferCard.css';

type OfferCardProps = {
  imageUrl: string;
  days: number;
  hotelName: string;
  location: string;
  price: number;
  currency: string;
};

const OfferCard: React.FC<OfferCardProps> = ({
  imageUrl,
  days,
  hotelName,
  location,
  price,
  currency,
}) => {
  return (
    <div className="offer-card">
      <div className="offer-image-container">
        <img src={imageUrl} alt="Offer" className="offer-image" />
      </div>
      <div className="offer-details">
        <div>
        <span className="offer-duration">{days} ημερες / {days-1} νυχτες</span>
        <h3 className="offer-title">ΚΑΛΟΚΑΙΡΙ ΣΤΟ {hotelName.toUpperCase()} {location.toUpperCase()} ΜΕ ΤΟ Ι.Χ ΣΑΣ</h3>
        </div>
        {/* <p className="offer-location">{location}</p> */}
        <div className="offer-price">
          <div>
            <span style={{fontSize:12,fontWeight:400}}>ΑΠΟ </span>
            <span>{price} {currency}</span>
          </div>
          <div>
            <button className="offer-button">Κράτηση</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
