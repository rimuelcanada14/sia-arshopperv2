import React from 'react';
import { FaSquare } from "react-icons/fa";
import './Wayfinding.css'; // Assuming you have a separate CSS file for styling

const Legend = () => {
  return (
    <div className="legend-container">
      <div className="legend-content">

        <div className="icon-text">
          <FaSquare className='junk-food' />
          <p className='legend-text'>JUNK FOODS</p>
        </div>
        <div className="icon-text">
          <FaSquare className='ice-cream' />
          <p className='legend-subtext'>ICE CREAM</p>
        </div>
        <div className="icon-text">
          <FaSquare className='frozen' />
          <p className='legend-text'>FROZEN GOODS</p>
        </div>
        <div className="icon-text">
          <FaSquare className='pastry' />
          <p className='legend-subtext'>PASTRY</p>
        </div>
        <div className="icon-text">
          <FaSquare className='beverages' />
          <p className='legend-subtext'>BEVERAGES</p>
        </div>
        <div className="icon-text">
          <FaSquare className='laundry' />
          <p className='legend-subtext'>LAUNDRY/DISHES</p>
        </div>
        <div className="icon-text">
          <FaSquare className='water' />
          <p className='legend-subtext'>WATER</p>
        </div>

      </div>

      <div className="legend-content">

        <div className="icon-text">
          <FaSquare className='condiments' />
          <p className='legend-text'>CONDIMENTS</p>
        </div>
        <div className="icon-text">
          <FaSquare className='noodles' />
          <p className='legend-subtext'>NOODLES</p>
        </div>
        <div className="icon-text">
          <FaSquare className='powdered' />
          <p className='legend-text'>DRINK MIX</p>
        </div>
        <div className="icon-text">
          <FaSquare className='instant' />
          <p className='legend-subtext'>INSTANT NOODLES</p>
        </div>
        <div className="icon-text">
          <FaSquare className='oil' />
          <p className='legend-text'>OIL</p>
        </div>
        <div className="icon-text">
          <FaSquare className='canned' />
          <p className='legend-subtext'>CANNED GOODS</p>
        </div>
        <div className="icon-text">
          <FaSquare className='nibbles' />
          <p className='legend-text'>NIBBLES</p>
        </div>
        <div className="icon-text">
          <FaSquare className='choco' />
          <p className='legend-subtext'>CHOCOLATES</p>
        </div>


      </div>

      <div className="legend-content">

        <div className="icon-text">
          <FaSquare className='spread' />
          <p className='legend-text'>BREAD SPREAD</p>
        </div>
        <div className="icon-text">
          <FaSquare className='coffee' />
          <p className='legend-subtext'>COFFEE/MILK</p>
        </div>
        <div className="icon-text">
          <FaSquare className='utensils' />
          <p className='legend-text'>UTENSILS</p>
        </div>
        <div className="icon-text">
          <FaSquare className='toiletries' />
          <p className='legend-subtext'>TOILETRIES</p>
        </div>
        <div className="icon-text">
          <FaSquare className='biscuits' />
          <p className='legend-text'>BISCUITS</p>
        </div>
        <div className="icon-text">
          <FaSquare className='candies' />
          <p className='legend-subtext'>CANDIES</p>
        </div>
        <div className="icon-text">
          <FaSquare className='liquor' />
          <p className='legend-subtext'>LIQUOR</p>
        </div>

      </div>
    </div>
  );
};

export default Legend;
