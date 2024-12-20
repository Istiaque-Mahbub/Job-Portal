import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplication = () => {
    const application = useLoaderData();
    const handleStatusUpdate = (e, id) => {
        const data = {
            status: e.target.value,
        }
        fetch(`https://job-portal-server-iota-steel.vercel.app/job-applications/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Status Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.reload();
                }
            })
    }
    return (
        <div>
            <h2 className="text-2xl">View Application for this job: {application.length}</h2>
            {
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                application.map((app, index) => <tr key={app._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{app.applicant_email}</td>
                                    <td>{app.status} </td>
                                    <td><select onChange={(e) => handleStatusUpdate(e, app._id)} className="select select-bordered select-xs w-full max-w-xs" defaultValue={app.status || 'Change Status'}>
                                        <option disabled>Change Status</option>
                                        <option>Under Review</option>
                                        <option>On Hold</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default ViewApplication;