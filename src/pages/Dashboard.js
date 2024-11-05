import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import AddExpensesModal from "../components/modals/AddExpensesModal";
import AddIncomeModal from "../components/modals/AddIncomeModal";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import TransactionTable from "../components/table/transactionTable";
import Loader from "../components/Loader/Loader";
import React from "react";

const Dashboard = () => {

    const [user] = useAuthState(auth);// destruct it as it contains a array and we want just user
    
    const [loading,setLoading]=useState(false);

    const [transactions,setTransactions]=useState([]);

    async function fetchTransactions(){
        setLoading(true);
        if(user){
           
            try{
                const q = query(collection(db, `users/${user.uid}/transactions`));

            const querySnapshot = await getDocs(q);
            let transactionsArray=[];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                transactionsArray.push(doc.data());
            });

            setTransactions(transactionsArray);
            }
            catch(e){
                toast.error(e.message);
            }
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchTransactions();
    },[user]);

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

     
    async function addTransaction(transaction,many){
        try{
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`),transaction);
            console.log("Document written with ID: ", docRef.id);
            if(!many) toast.success("Transaction Added !")

            //transaction update
            setTransactions([...transactions, transaction]);

            handleExpenseModal();
            handleIncomeModal();
        }
        catch(e){
            if(!many) toast.error("Unable to Add Transaction")
        }
    }

    
    function onFinish(values,type){
        const newTransaction={
            type:type,
            date:values.date.format("YYYY-MM-DD"),
            amount:parseFloat(values.amount),
            tag:values.tag,
            name:values.name
        }
        console.log(newTransaction)
        addTransaction(newTransaction);
    };

    const [totalBalance,setTotalBalance]=useState(0);
    const [income,setIncome]=useState(0);
    const [expense,setExpense]=useState(0);

    useEffect(()=>{
        let totalincome=0;
        let totalexpense=0;

        transactions.forEach((transaction)=>{
            if(transaction.type === "Income"){
                totalincome+=transaction.amount;
            }
            else{
                totalexpense+=transaction.amount;
            }
        })

        setIncome(totalincome);
        setExpense(totalexpense);
        setTotalBalance((totalincome - totalexpense));
    },[transactions])
    
    return ( 
        <div>
            {
                    loading?(<div className="w-[100vw] h-[95vh] flex justify-center items-center"> 
                        <Loader />
                    </div>):(
                        
                        <div>

                            <Cards showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} income={income} expense={expense} totalBalance={totalBalance}/>
        
                            <AddExpensesModal isExpenseModal={isExpenseModal} handleExpenseModal={handleExpenseModal} onFinish={onFinish}/>
        
                            <AddIncomeModal isIncomeModal={isIncomeModal} handleIncomeModal={handleIncomeModal} onFinish={onFinish}/>
        
                            <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions}/>
    
                        </div>)
                    
                
            }
            
            
        </div>
     );
}
 
export default Dashboard;