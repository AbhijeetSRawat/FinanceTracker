import { Table } from 'antd';
import { useState } from 'react';
import React from 'react';
import { Flex, Radio, Button } from 'antd';
import './transactionTable.css'
import { parse, unparse } from 'papaparse';
import toast from 'react-hot-toast';


const TransactionTable = ({ transactions ,addTransaction, fetchTransactions }) => {

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

    function exportCSV(){
      // Specifying fields and data explicitly
      var csv =unparse({
        fields: ["date","name","amount","type","tag"],
        data: transactions
      });

      const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      
      const url=URL.createObjectURL(blob);
      const link=document.createElement("a");
      link.href=url;
      link.download="transactions.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    async function importFromCSV(event) {
      event.preventDefault();
    
      try {
        parse(event.target.files[0], {
          header: true,
          complete: async function (results) {
            const transactionPromises = results.data.map(transaction => {
              const newTransaction = {
                ...transaction,
                amount: parseFloat(transaction.amount), // Ensure amount is correctly parsed as float
              };
              // Push each `addTransaction` call into a promise array
              return addTransaction(newTransaction, true);
            });
    
            // Wait for all transactions to be added
            await Promise.all(transactionPromises);
    
            toast.success("All Transactions Added!");
            fetchTransactions();
            event.target.value = ""; // Clear input field to allow re-uploading the same file if needed
          },
        });
      } catch (e) {
        toast.error(e.message);
      }
    }

    return (
      <div>
          <div className='flex flex-col lg:flex-row mt-4'>
              
              <div className='flex mb-2 p-2'>
                <label htmlFor="SerachBar" className='text-2xl lg:pl-1 font-bold text-slate-800'>
                  <img src="https://i.pinimg.com/736x/fa/0e/7b/fa0e7b992eff03c576727e95c746005c.jpg" className='w-[38px] rounded-s-md' alt="Search" />
                </label>
                <input type="text" className='bg-gray-100 rounded-e-md p-1 w-[85vw] lg:w-[65vw]  shadow-lg' id="SearchBar" value={search} placeholder="Search By Name..." onChange={(e)=>setSearch(e.target.value)} />
              </div>

              <Flex className='p-2 lg:w-[30vw]'  vertical gap="middle">
                
                <Radio.Group
                  block
                  options={options1}
                  defaultValue="All"
                  optionType="button"
                  buttonStyle="solid"
                  value={typeFilter}
                  onChange={(e)=>setTypeFilter(e.target.value)}
                  className="custom-radio-group"
                />
                
              </Flex>
          </div>
          
          <div className='p-2 flex flex-col lg:flex-row ' >
            <h2 className=' text-2xl pt-1 font-bold '>My Transactions</h2>

            
            <Flex className='mt-2 lg:mx-auto w-[100vw] lg:w-[30vw]' vertical gap="middle" >
              
              <Radio.Group defaultValue="nosort" className="custom-radio-group "  onChange={(e)=>setSortKey(e.target.value)}>
                <Radio.Button className='w-[23vw] lg:pl-10 lg:w-[8vw]' value="nosort">No Sort</Radio.Button>
                <Radio.Button className='w-[40vw] pl-6 lg:w-[10vw]' value="sortbyamount">Sort by Amount</Radio.Button>
                <Radio.Button className='w-[33vw] pl-6 lg:w-[8vw]' value="sortbydate">Sort by Date</Radio.Button>
                
              </Radio.Group>
              
            </Flex>

            <div className='flex'>
              <Flex gap="small" className='mt-3 ' wrap>
                <Button className='bg-black ' onClick={exportCSV} type="primary">Export CSV</Button>
              </Flex>

              <div className='flex mt-3'>
                  <label htmlFor="file-csv" className='ml-2 bg-black w-24 flex justify-center items-center rounded-md text-sm pb-1 hover:bg-blue-500 cursor-pointer text-white ' >Import CSV</label>
                  <input type="file" hidden id='file-csv' accept='.csv' onChange={importFromCSV} required />
              </div>
            </div>
            

          </div>
          

          <Table className='p-2 shadow-lg rounded-lg w-[100vw] lg:w-[99vw] ' dataSource={filteredSortedArray} columns={columns} />
      </div>
    );
}

export default TransactionTable;