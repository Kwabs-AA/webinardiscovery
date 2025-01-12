import Plot from 'react-plotly.js';
import { useEffect,useState } from "react";

interface Props{
    values:number;
    label:string;
}

const PieChart = ({values,label}:Props) => {
    const [category,setCategory]=useState<any>([])
     useEffect(()=>{
            const fetchData =async()=>{
                const res=await fetch(`/api/categories`)
                if (res.ok){
                    const data= await res.json();
                    setCategory(data)

                }
            };fetchData()
        },[])
  return (
    <div>
      <Plot
        data={[
          {
           values:[1,2,3]
          }
        ]}
        layout={ {width: 320, height: 240, title: {text: 'A Fancy Plot'}} }
      />
    </div>
  )
}

export default PieChart
