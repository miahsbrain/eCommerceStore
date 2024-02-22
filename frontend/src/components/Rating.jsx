import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function Rating({value, text}) {
  return (
    <div className='rating'>
        {/* <span>
             {
                value >= 1 ? <FaStar color={'gold'} />
                : value >= 0.5 ? <FaStarHalfAlt /> : <FaStar />
             }
             {
                value >= 2 ? <FaStar color={'gold'} />
                : value >= 1.5 ? <FaStarHalfAlt /> : <FaStar />
             }
             {
                value >= 3 ? <FaStar color={'gold'} />
                : value >= 1.5 ? <FaStarHalfAlt /> : <FaStar />
             }
             {
                value >= 4 ? <FaStar color={'gold'} />
                : value >= 3.5 ? <FaStarHalfAlt /> : <FaStar />
             }
             {
                value >= 5 ? <FaStar color={'gold'} />
                : value >= 4.5 ? <FaStarHalfAlt /> : <FaStar />
             }

        </span> */}

            {[...Array(5)].map((star, index) => {
                const starid = index +1;
                return (
                    <label key={starid} style={{  color: "gold", fontSize: "1.5rem" }} >
                        {starid <= value ? <FaStar /> : Number(starid - 0.5) === Number(value) ? <FaStarHalfAlt /> : <FaRegStar />}
                    </label>
                )
            })
            }
            <span>{text && text}</span>
    </div>
  )
}
