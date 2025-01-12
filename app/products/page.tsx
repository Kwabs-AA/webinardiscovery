"use client"
import  { useEffect, useState } from 'react'

export default function Page (){
    const fetchProducts = async()=>{
        const res=await fetch("/api/products");
        const products=await res.json();
        return products;
    }
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts().then((products)=>{
        setProducts(products);
    });

    },[]);

  return (
    <div>
      {products.map((product:any,index)=>(
        <div key={index} className='border-black border-r-2'>
            <h2>{product.name}</h2>
            <h2>{product.price}</h2>
            <h2>{product.description}</h2>
        </div>
    ))}
    </div>
  )
};


