import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

const AddExpensesModal = ({isExpenseModal,handleExpenseModal,onFinish}) => {

    const [form]=Form.useForm();

    return ( 
        <div>
            <Modal
                visible={isExpenseModal}
                onCancel={handleExpenseModal}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values)=>{
                        onFinish(values,"Expense");
                        form.resetFields();
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                              required: true,
                              message: "Please input the name of the Transaction"
                            },
                          ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="Amount"
                        rules={[
                            {
                              required: true,
                              message: "Please input the Expense Amount!"
                            },
                          ]}
                    >
                        <Input type="number"/>
                    </Form.Item>

                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[
                            {
                              required: true,
                              message: "Please select the date of the expense"
                            },
                          ]}
                    >
                        <DatePicker format="YYYY-MM-DD"/>
                    </Form.Item>

                    <Form.Item
                        label="Tag"
                        name="tag"
                        rules={[
                            {
                              required: true,
                              message: "Please select a tag"
                            },
                          ]}
                    >
                        <Select>
                            <Select.Option value="Food">Food</Select.Option>
                            <Select.Option value="Education">Education</Select.Option>
                            <Select.Option value="Bills">Bills</Select.Option>
                            <Select.Option value="Travel">Travel</Select.Option>
                            <Select.Option value="Office">Office</Select.Option>
                            <Select.Option value="Others">Others</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" className="bg-black text-white rounded-lg">
                            Add Expense
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
     );
}
 
export default AddExpensesModal;