import React, { useState, useEffect } from 'react';
import instance from "../api/instance";

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState()

    useEffect(() => {
            instance.get("categories").then((response) => {
                setCategories({
                    data: response.data,
                });
            })
    }, [])
    
   const handleCategoryClick = (categoryName) => {
    instance.get(`random?${categoryName}`).then((response) => {
        setCategory({
            categoryName:categoryName,
            value: response.data.value,
            createdAt: response.data.created_at,
            updatedAt: response.data.updated_at,
            iconUrl:response.data.icon_url,
            id: response.data.id,
            url: response.data.url
        });
    })
    
    console.log(category)
   }

    return ( 
        <div className = "chuck-norris">
            <div className = "categories">
                <h4>Categories</h4>
                {
                    categories.data && categories.data.map( categoryName => {
                        return <h5
                        key = { categoryName }
                        onClick = {() => handleCategoryClick(categoryName)}
                        >
                        { categoryName }
                        </h5>
                    })
                }
            </div>
            { category?.value ? 
            <div className = "category">
                <h4>Category: {category?.categoryName}</h4>
                <img src={category?.iconUrl} alt="icon"/>
                <p>
                    {category?.value}
                </p><br/>
                <a href = {category?.url} target="_blank">url</a> <br/>
                <span>id: { category?.id }</span><br/>
                <span>
                    Created at: { category?.createdAt }
                </span><br/>
                <span>
                    Updated at: { category?.updatedAt } 
                </span>
            </div> : null
            }
        </div>
     );
}
 
export default Categories;