import React from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const JobApply = () => {
    const {id} = useParams();
    const {user} = useAuth();

    // console.log(id,user.email);
    
    const handleJobApplication = e=>{
        e.preventDefault();
        const form=e.target;
        const linkedin = form.linkedin.value;
        const github = form.github.value;
        const resume = form.resume.value;
        // console.log(linkedin,github,resume)
        const jobApplication = {
            job_id:id,
            applicant_email:user.email,
            linkedin,
            github,
            resume
            
        }
        fetch('http://localhost:5000/job-applications',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Applied Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    return (
    
    <div className="card bg-base-100 w-full my-10 shadow-2xl">
    <h1 className="text-5xl font-bold text-center">Apply the Job & Good Luck!</h1>
      <form onSubmit={handleJobApplication} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">LinkedIn URL</span>
          </label>
          <input type='url' name='linkedin' placeholder="linkedin url" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">GitHub URL</span>
          </label>
          <input type="url" name='github' placeholder="github url" className="input input-bordered" required />
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Resume URL</span>
          </label>
          <input type="url" name='resume' placeholder="resume url" className="input input-bordered" required />
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Apply</button>
        </div>
      </form>
    </div>
  
    );
};

export default JobApply;