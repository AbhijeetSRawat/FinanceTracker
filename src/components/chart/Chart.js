import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';

const Charts = ({transactions}) => {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 500);
      };
  
      window.addEventListener('resize', handleResize);
      
      // Clean up event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const data=transactions.map((item)=>{
        return{date : item.date, amount: item.amount}
    });
    
      const config1 = {
        data,
        width: 1550,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };
    
      const config2 = {
        data,
        width: 350,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };

      let chart;
    
      // Export Image
      const downloadImage = () => {
        chart?.downloadImage();
      };
    
      // Get chart base64 string
      const toDataURL = () => {
        console.log(chart?.toDataURL());
      };

    return ( 
        <div >
        {isSmallScreen ? (
            <Line className="w-[95vw] ml-2 shadow-lg rounded-lg bg-white" {...config2} onReady={(chartInstance) => (chart = chartInstance)} />
         ) : (
            <Line className="w-[97vw] ml-3 shadow-lg rounded-lg bg-white" {...config1} onReady={(chartInstance) => (chart = chartInstance)} />
      )}
    </div>
     );
}
 
export default Charts;