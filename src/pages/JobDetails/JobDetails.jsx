import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const JobDetails = () => {
    const {_id,title,description,company,company_logo,jobType,salaryRange,requirements,location,applicationDeadline,hr_name,hr_email,responsibilities,status} = useLoaderData();
   
    return (
        <div className='space-y-4 m-8 px-10'>
            <h2 className='flex gap-2 items-center'><img src={company_logo} alt={`logo of ${company}`} />Job Details of {company}</h2>
            <p>Apply for: {title}</p>
            <p>Job Description: {description}</p>
            <p className='flex gap-4'> Requirements:
              {
                requirements.map((skill,idx)=><p key={idx}
                className='border  border-blue-600 rounded-lg text-center px-2 hover:text-blue-700 hover:bg-gray-300'
                > {skill}</p>)
              }
            </p>
            <p className='flex gap-4 items-center'> Responsibilities:
              {
                requirements.map((skill,idx)=><p key={idx}
                className='border  border-blue-600 rounded-lg text-center px-2 hover:text-blue-700 hover:bg-gray-300'
                > {responsibilities}</p>)
              }
            </p>
            <p>Location: {location}</p>
            <p>Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
            <p>Job Type: {jobType}</p>
            <p>Dateline: {applicationDeadline}</p>
            <p>Status: {status}</p>
            <p>HR Name: {hr_name}</p>
            <p>HR Email: {hr_email}</p>
            <Link to={`/jobApply/${_id}`}><button className="btn btn-primary">Apply Now</button></Link>
        </div>
    );
};

export default JobDetails;