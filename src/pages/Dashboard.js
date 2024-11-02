import { useState } from "react";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpensesModal from "../components/modals/AddExpensesModal";
import AddIncomeModal from "../components/modals/AddIncomeModal";

const Dashboard = () => {

    const [isExpenseModal,setIsExpenseModal]=useState(false);
    const [isIncomeModal,setIsIncomeModal]=useState(false);

    const showExpenseModal=()=>{
        setIsExpenseModal(true);
    }
    const handleExpenseModal=()=>{
        setIsExpenseModal(false);
    }

    const showIncomeModal=()=>{
        setIsIncomeModal(true);
    }
    const handleIncomeModal=()=>{
        setIsIncomeModal(false);
    }

    function onFinish(values,type){
        console.log(values+type);
    }

    return ( 
        <div>

            <Cards showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal}/>

            <AddExpensesModal isExpenseModal={isExpenseModal} handleExpenseModal={handleExpenseModal} onFinish={onFinish}/>

            <AddIncomeModal isIncomeModal={isIncomeModal} handleIncomeModal={handleIncomeModal} onFinish={onFinish}/>

            
        </div>
     );
}
 
export default Dashboard;