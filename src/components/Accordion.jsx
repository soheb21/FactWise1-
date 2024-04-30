import React, { useEffect, useState } from 'react'
import data from "../../celebrities.json"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdDone, MdCancel } from "react-icons/md";
import { CiSearch } from "react-icons/ci";


const Accordion = () => {
    const initialUserState = {
        first: "",
        last: "",
        country: "",
        dob: "",
        description: "",
        gender: ""

    }
    const [users, setUsers] = useState([])
    const [activeIndex, setActiveIndex] = useState(null);
    const [isEdit, setIsEdit] = useState(false)
    const [userInfo, setUserInfo] = useState(initialUserState)
    const [age, setAge] = useState("")
    const [searchData, setSearchData] = useState("")
    const handleEdit = (data, index) => {

        if (activeIndex === index) {

            setUserInfo({
                first: data?.first,
                last: data.last,
                country: data.country,
                dob: data.dob,
                description: data.description,
                gender: data.gender

            })
            setIsEdit(true)
        }
    }


    const handleSave = (id, index) => {
        setUsers(prevUser => prevUser.map(u =>
            u.id === id && activeIndex === index ? { ...u, first: userInfo.first, last: userInfo.last, country: userInfo.country, dob: userInfo.dob, description: userInfo.description, gender: userInfo.gender } : u
        ))
        setIsEdit(false);
        setUserInfo({
            first: "",
            last: "",
            country: "",
            dob: "",
            description: "",
            gender: ""
        })

    }

    const handleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);

    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            const userDeleted = users.filter(i => i.id !== id);
            setUsers(userDeleted)
            setActiveIndex(null)
        }


    }

    const calculateAge = (dob) => {

        const today = new Date();
        const birthDate = new Date(dob);
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        setAge(calculatedAge);


    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };



    useEffect(() => {
        setUsers(data)
    }, [])

    const handleSearch = (e) => {
        setSearchData(e.target.value);
        const results = users.filter(item =>
            item.first.toLowerCase().includes(searchData.toLowerCase())
        );
        setUsers(results);


    }





    return (
        <section className='p-4 h-full w-full mx-auto'>
            <div className="w-full flex justify-center ">
                <div className="border-[1px] flex gap-2 mt-2 rounded-md items-center p-2 md:p-4 w-full md:w-1/2">
                    <p><CiSearch /></p>
                    <input onChange={handleSearch} className='outline-none w-full' type="text" placeholder='Search User' />
                </div>
            </div>
            {

                users?.map((user, index) => {
                    return (
                        <div key={user.id} className='h-fit  md:mx-auto rounded-md my-4 md:m-11 border-[1px] border-black w-full  md:w-1/2 p-2' >
                            <div className="rounded-md md:p-4 flex justify-between">
                                <div className="flex  items-center gap-4">
                                    <div className="w-20 rounded-full overflow-hidden">
                                        <img className='h-full w-full' src={user?.picture} alt="user-img" />
                                    </div>
                                    <div className="flex gap-2 flex-col mx-auto md:flex-row">
                                        {

                                            isEdit && activeIndex === index ?
                                                <>
                                                    <input className={`w-fit ${isEdit && 'border-black border-2 p-1 rounded-md'}`} autoFocus onChange={handleChange} name='first' value={userInfo.first} type="text" />
                                                    <input className={`w-fit ${isEdit && 'border-black border-2 p-1 rounded-md'}`} onChange={handleChange} name='last' value={userInfo.last} type="text" />
                                                </>
                                                : <p className=' font-bold'>{user?.first}{' '}{user?.last} </p>
                                        }
                                    </div>
                                </div>
                                <button onClick={() => { handleAccordion(index), calculateAge(user.dob) }}>{activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                            </div>

                            {/* Accordion open */}



                            {
                                activeIndex === index && <div className=" transition-all  w-full rounded-md p-4">
                                    <div className="flex flex-col md:flex-row gap-2 justify-between p-4 " >
                                        <div className="flex flex-col gap-2">
                                            <p className='text-gray-400'>Age</p>
                                            {

                                                isEdit ? <input className={`w-fit ${isEdit && 'border-black border-2 p-1 rounded-md'}`} onChange={handleChange} name='dob' value={userInfo.dob} type="text" /> : <p>{age} Years </p>
                                            }


                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className='text-gray-400'>Gender</p>

                                            {

                                                isEdit
                                                    ? <select onChange={handleChange} name='gender' value={userInfo.gender}>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>

                                                    : <p>{user?.gender} </p>
                                            }

                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className='text-gray-400'>Country</p>
                                            {
                                                isEdit ? <input className={`w-fit ${isEdit && 'border-black border-2 p-1 rounded-md'}`} onChange={handleChange} name='country' value={userInfo.country} type="text" /> : <p>{user?.country} </p>

                                            }


                                        </div>


                                    </div >
                                    <div className="flex flex-col gap-2">
                                        <p className='text-gray-400'>Description</p>
                                        {

                                            isEdit ? <textarea rows={6} className={`w-full ${isEdit && 'border-black border-2 p-1 rounded-md'}`} onChange={handleChange} name='description' value={userInfo.description} type="text" /> : <p>{user?.description} </p>
                                        }

                                    </div>
                                    <div className="flex transition-all gap-4 justify-end mt-5 w-full">
                                        {
                                            isEdit
                                                ? <>
                                                    <button className='text-red-500 md:text-2xl' onClick={() => setIsEdit(false)}><MdCancel /></button>
                                                    <button className='text-green-500 md:text-2xl' onClick={() => handleSave(user.id, index)}><MdDone /></button>
                                                </>
                                                :
                                                <>
                                                    <button className='text-red-500 md:text-2xl' onClick={() => handleDelete(user.id)}><FaRegTrashAlt /></button>
                                                    <button className='text-yellow-500 md:text-2xl' onClick={() => handleEdit(user, index)}><CiEdit /></button>
                                                </>
                                        }

                                    </div>
                                </div >

                            }







                        </div >
                    )

                })

            }
        </section >
    )
}

export default Accordion