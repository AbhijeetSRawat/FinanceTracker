import { Table } from 'antd';
import { useState } from 'react';
import React from 'react';
import { Flex, Radio } from 'antd';

const TransactionTable = ({ transactions }) => {

  const [search,setSearch]=useState("");
  const [typeFilter,setTypeFilter]=useState("");
  const [sortKey,setSortKey]=useState("");

    const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
      ];
     
      const options1 = [
        { label: 'All', value: '' },
        { label: 'Income', value: 'Income' },
        { label: 'Expense', value: 'Expense' },
      ];
      
    let filteredArray=transactions.filter(
      (transaction)=>(transaction.name.toLowerCase().includes(search.toLowerCase()) && transaction.type.toLowerCase().includes(typeFilter.toLowerCase()) )
    );
    
    let filteredSortedArray=[...filteredArray].sort((a,b)=>{
      if(sortKey === "sortbydate"){
        return new Date(a.date)-new Date(b.date);
      }
      else if(sortKey === "sortbyamount"){
        return a.amount-b.amount;
      }
      else{
        return 0;
      }
    });

    return (
      <div>
          <div className='flex flex-col lg:flex-row mt-4'>
              
              <div className='flex mb-2 p-2'>
                <label htmlFor="SerachBar" className='text-2xl lg:pl-1 font-bold text-slate-800'>
                  <img src="https://i.pinimg.com/736x/fa/0e/7b/fa0e7b992eff03c576727e95c746005c.jpg" className='w-[38px] rounded-s-md' alt="image" />
                </label>
                <input type="text" className='bg-gray-100 rounded-e-md p-1 w-[85vw] lg:w-[65vw]  shadow-lg' id="SearchBar" value={search} placeholder="Search By Name..." onChange={(e)=>setSearch(e.target.value)} />
              </div>

              <Flex className='p-2 lg:w-[26vw]' vertical gap="middle">
                
                <Radio.Group
                  block
                  options={options1}
                  defaultValue="All"
                  optionType="button"
                  buttonStyle="solid"
                  value={typeFilter}
                  onChange={(e)=>setTypeFilter(e.target.value)}
                />
                
              </Flex>
          </div>
          
          <div className='p-2 flex flex-col lg:flex-row lg:justify-between w-[100vw]' >
            <h2 className=' text-2xl pt-1 font-bold'>My Transactions</h2>

            
            <Flex className='mt-2 mx-auto' vertical gap="middle" >
              
              <Radio.Group defaultValue="nosort" onChange={(e)=>setSortKey(e.target.value)}>
                <Radio.Button value="nosort">No Sort</Radio.Button>
                <Radio.Button value="sortbyamount">Sort By Amount</Radio.Button>
                <Radio.Button value="sortbydate">Sort By Date</Radio.Button>
                
              </Radio.Group>
              
            </Flex>

          </div>
          

          <Table className='p-2 shadow-lg rounded-lg w-[100vw] lg:w-[99vw] ' dataSource={filteredSortedArray} columns={columns} />
      </div>
    );
}

export default TransactionTable;