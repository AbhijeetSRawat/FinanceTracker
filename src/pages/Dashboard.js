import { useState } from "react";
import Cards from "../components/Cards";
import { collection, addDoc } from "firebase/firestore";
import AddExpensesModal from "../components/modals/AddExpensesModal";
import AddIncomeModal from "../components/modals/AddIncomeModal";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import moment from "moment";

const Dashboard = () => {

    const [user] = useAuthState(auth);// destruct it as it contains a array and we want just user

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

     
    async function addTransaction(transaction){
        try{
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`),transaction);
            console.log("Document written with ID: ", docRef.id);
            toast.success("Transaction Added !")
            handleExpenseModal();
            handleIncomeModal();
        }
        catch(e){
            toast.error("Unable to Add Transaction")
        }
    }

    
    function onFinish(values,type){
        const newTransaction={
            type:type,
            date:moment(values.date).format("YYYY-MM-DD"),
            amount:parseFloat(values.amount),
            tag:values.tag,
            name:values.name
        }
        addTransaction(newTransaction);
    };

    return ( 
        <div>
            
            <Cards showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal}/>

            <AddExpensesModal isExpenseModal={isExpenseModal} handleExpenseModal={handleExpenseModal} onFinish={onFinish}/>

            <AddIncomeModal isIncomeModal={isIncomeModal} handleIncomeModal={handleIncomeModal} onFinish={onFinish}/>

            
        </div>
     );
}
 
export default Dashboard;