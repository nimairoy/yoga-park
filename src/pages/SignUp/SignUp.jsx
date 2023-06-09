import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = data => console.log(data)

    return (
        <>
            <div className="min-h-screen py-12 bg-base-200">
                <div className="w-3/4  flex justify-center mx-auto">
                    <div className="card w-full max-w-xl shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-400'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input {...register("photo", { required: true })} type="text" placeholder="Photo URL" className="input input-bordered" />
                                {errors.photo && <span className='text-red-400'>Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className='text-red-400'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} type="password" placeholder="Password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className='text-red-400'>Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-400'>Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-400'>Password must be less then 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className='text-red-400'>Password must be includes an uppercase, a lowercase, a number and a special character</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Sign Up" className="btn btn-warning" />
                            </div>
                        </form>
                        <p className='text-center pb-5'>Already have an account? <Link className='text-warning underline font-bold' to='/login'>Login</Link></p>
                        {/* TODO add a social login icon  */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;