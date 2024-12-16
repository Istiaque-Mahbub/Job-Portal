import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";


const AddJob = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const handleAddJob = e =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries())
        console.log(initialData)
        const {min,max,currency,...newJob} =initialData;
        newJob.salaryRange = {min,max,currency};
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');
        console.log(newJob)

        fetch('http://localhost:5000/jobs',{
            method:"POST",
            headers:{
                'content-type' : 'application/json',
            },
            body: JSON.stringify(newJob),
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your job has been post successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }else{
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Something went wrong please try again with proper information",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/myPostedJobs')
            }
        })

    }
    return (
        <div>
            <h2 className="text-3xl">Post the job</h2>
            <form onSubmit={handleAddJob} className="card-body">
                {/* Job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" name="title" placeholder="job title" className="input input-bordered" required />
                </div>
                {/* Company */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company</span>
                    </label>
                    <input type="text" name="company" placeholder="Company Name" className="input input-bordered" required />
                </div>
                {/* location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" name="location" placeholder="job location" className="input input-bordered" required />
                </div>
                {/* job type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select defaultValue='Pick A Job Type' name="type" className="select select-ghost w-full max-w-xs">
                        <option disabled>Pick A Job Type</option>
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Intern</option>
                        <option>Hybrid</option>
                    </select>
                </div>
                {/* category */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Category</span>
                    </label>
                    <select defaultValue="Pick A Job Category" name="category" className="select select-ghost w-full max-w-xs">
                        <option disabled>Pick A Job Category</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                        <option>Management</option>
                        <option>Data Science</option>
                        <option>Design</option>
                        <option>Development</option>
                    </select>
                </div>
                {/* Dateline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Application Dateline</span>
                    </label>
                    <input type="date" name="applicationDateline" placeholder="applicationDateline" className="input input-bordered" required />
                </div>
                {/* description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Description</span>
                    </label>
                    <textarea name="description" className="textarea textarea-bordered" placeholder="job description" required></textarea>
                </div>
                {/* requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Requirements</span>
                    </label>
                    <textarea name="requirements" className="textarea textarea-bordered" placeholder="put each requirements in a new line" required></textarea>
                </div>
                {/* responsibilities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Responsibilities</span>
                    </label>
                    <textarea name="responsibilities" className="textarea textarea-bordered" placeholder="put each responsibility in a new line" required></textarea>
                </div>
                {/* salary range */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-end">

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Salary Range</span>
                    </label>
                    <input type="text" name="min" placeholder="Min" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <input type="text" name="max" placeholder="Max" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <select defaultValue="currency" name="currency" className="select select-ghost w-full max-w-xs">
                        <option disabled>Currency</option>
                        <option>bdt</option>
                        <option>usd</option>
                        <option>inr</option>
                    </select>
                </div>

                </div>
                {/* status */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Status</span>
                    </label>
                    <input type="text" name="status" placeholder="status" className="input input-bordered" required />
                </div>
                {/* hr name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" name="hr_name" placeholder="HR Name" className="input input-bordered" required />
                </div>
                {/* hr email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input type="text" defaultValue={user?.email} name="hr_email" placeholder="HR Email" className="input input-bordered" required />
                </div>
                {/* logo */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo URL</span>
                    </label>
                    <input type="url" name="company_logo" placeholder="Logo URL" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Add a Job</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;