import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUser = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })


    const handleMakeAdmin = user => {
        fetch(`https://yoga-camp-server.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }


    const handleMakeInstructor = user => {
        fetch(`https://yoga-camp-server.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is Instructor Now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDelete = id => {
        fetch(`https://yoga-camp-server.vercel.app/users/admin/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully Deleted',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className="overflow-x-auto w-3/4">
            <h2 className="text-3xl text-center mb-8">All Users Here</h2>
            <table className="table w-full text-[14px]">
                <thead>
                    <tr className="text-lg">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => <tr
                            key={user._id}
                        >
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role === 'admin' ? <span className={`text-md font-bold p-2 rounded bg-green-300 ${user.role==="instructor" ? 'disabled': ''}`}>Admin</span> : <button onClick={() => handleMakeAdmin(user)} className='px-4 font-semibold py-2 rounded bg-yellow-400 text-yellow-800'>Make Admin</button>}</td>
                            <td>{user.role === 'instructor' ? <span className={`text-md font-bold p-2 rounded bg-green-300 ${user.role==="instructor" ? 'disabled': ''}`}>Instructor</span> : <button onClick={() => handleMakeInstructor(user)} className='px-4 font-semibold py-2 rounded bg-yellow-400 text-yellow-800'>Make Instructor</button>}</td>
                            <td><AiFillDelete onClick={() => handleDelete(user._id)} className='text-4xl p-2 rounded bg-red-400 text-red-800 cursor-pointer'></AiFillDelete></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;