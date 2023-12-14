import React, { useState, useEffect } from 'react'
import { createProductApi, getAllProductsApi } from '../../apis/Api'
import { toast } from 'react-toastify'

const AdminDashboard = () => {

    // Make useState
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productCategory, setProductCategory] = useState('')

    // make useState for image
    const [productImage, setProductImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    // image upload function
    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        console.log(file)
        setProductImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }

    // Load all products when page loads
    const [products, setProducts] = useState([])
    useEffect(() => {
        getAllProductsApi().then((res) => {
            setProducts(res.data.products)
        })
    }, [])

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productDescription', productDescription)
        formData.append('productCategory', productCategory)
        formData.append('productImage', productImage)

        // send request to backend API
        createProductApi(formData).then((res) => {
            if (res.data.success == false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Internal Server Error!')
        })

    }






    return (
        <>
            <div className='m-4'>
                <div className='d-flex justify-content-between'>
                    <h1>Admin Dashboard</h1>

                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Product
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new product!</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <label>Product Name</label>
                                    <input onChange={(e) => setProductName(e.target.value)} className='form-control mb-2' type="text" name="" id="" placeholder='Enter product name' />

                                    <label htmlFor="">Product Description</label>
                                    <textarea onChange={(e) => setProductDescription(e.target.value)} className='form-control mb-2' placeholder={"Enter description"} cols="4" rows="4"></textarea>

                                    <label htmlFor="">Price</label>
                                    <input onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control mb-2' placeholder='Enter your price' />

                                    <label htmlFor="">Select category</label>
                                    <select onChange={(e) => setProductCategory(e.target.value)} className='form-control mb-2'>
                                        <option value="Flower">Flower</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Gadgets">Gadgets</option>
                                        <option value="Mobile">Mobile</option>
                                    </select>

                                    <label>Product Image</label>
                                    <input onChange={handleImageUpload} type="file" className='form-control' />

                                    {/* Preview Image */}

                                    {
                                        previewImage && <img src={previewImage} className='img-fluid rounded object-cover mt-2' />
                                    }


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleSubmit} type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <table className='table mt-2'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Category</th>
                            <th>Product Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item) => (
                                <tr>
                                    <td>
                                        <img src="https://th.bing.com/th/id/OIP.F4r_Be7u4rlyASWn77m6cQHaE8?rs=1&pid=ImgDetMain" height={40} width={40} />
                                    </td>
                                    <td>{item.productName}</td>
                                    <td>NPR.{item.productPrice}</td>
                                    <td>Flower</td>
                                    <td>Flower for decoration</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-success">Edit</button>
                                            <button type="button" className="btn btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </>
    )
}

export default AdminDashboard