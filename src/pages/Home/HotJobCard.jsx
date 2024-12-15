import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
const HotJobCard = ({job}) => {
    const {_id,title,description,company,company_logo,jobType,salaryRange,requirements,location} = job
    return (
        <div className="card card-compact bg-base-100  shadow-xl btn-outline">
       <div className='flex gap-2 m-2'>
       <figure>
          <img
          className='w-16'
            src={company_logo}
            alt={`${company} image`} />
        </figure>
        <div className='mt-4'>
            <h4 className="text-2xl">{company}</h4>
            <p className='flex items-center gap-1 text-gray-600'><CiLocationOn /> {location}</p>
        </div>
       </div>
        <div className="card-body mt-4">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className='flex flex-wrap gap-2 mt-4'>
            {
                requirements.map((skill,idx)=><p key={idx}
                className='border border-blue-600 rounded-lg text-center px-2 hover:text-blue-700 hover:bg-gray-300'
                >{skill}</p>)
            }
          </div>
          <div className="card-actions justify-end items-center mt-4">
            <p>Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
            <Link to={`/jobs/${_id}`}>
            <button className="btn btn-primary">Apply</button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default HotJobCard;