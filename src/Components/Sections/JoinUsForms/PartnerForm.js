import React from 'react'

function PartnerForm() {
    return (
        <div>
            <select name="category" id="category" placeholder='Category'>
                <option disabled value="selectCategory" selected>Select Category</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
            </select>

            <input type='text' placeholder='Business Name' vlaue='' />
            <input type='text' placeholder='Location' vlaue='' />
            <input type='number' placeholder='Business Phone' vlaue='' />

            <select name="Services" id="category" placeholder='Services'>
                <option disabled value="serviceSelect" selected>Select a Service</option>
                <option value="service1">Service 1</option>
                <option value="service2">Service 2</option>
                <option value="service3">Service 3</option>
                <option value="service4">Service 4</option>
            </select>
            <input type='textarea' placeholder='Enter Full Address Here' vlaue='' />
        </div>
    )
}

export default PartnerForm