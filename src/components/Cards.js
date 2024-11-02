import { Card, Row } from "antd";

const Cards = () => {
    return ( 
        <div>
            <Row className="flex flex-col lg:flex-row w-[100vw] p-2 lg:p-3 gap-2 lg:gap-4">
                <Card className="lg:w-[32vw] shadow-lg" title="Current Balance">
                    <p className="mb-2 text-lg">&#8377; 0</p>
                    <button className="w-[100%] bg-black rounded-lg text-white h-[40px] font-semibold hover:bg-white border hover:border-black hover:text-black">Reset Balance</button>
                </Card>

                <Card className="lg:w-[32vw] shadow-lg" title="Total Income">
                    <p className="mb-2 text-lg">&#8377; 0</p>
                    <button className="w-[100%] bg-black rounded-lg text-white h-[40px] font-semibold hover:bg-white border hover:border-black hover:text-black">Add Income</button>
                </Card>

                <Card className="lg:w-[32vw] shadow-lg" title="Total Expenses">
                    <p className="mb-2 text-lg">&#8377; 0</p>
                    <button className="w-[100%] bg-black rounded-lg text-white h-[40px] font-semibold hover:bg-white border hover:border-black hover:text-black">Add Expenses</button>
                </Card>
            </Row>
        </div>
     );
}
 
export default Cards;