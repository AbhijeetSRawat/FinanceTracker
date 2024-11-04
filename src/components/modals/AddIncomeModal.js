import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

const AddIncomeModal = ({isIncomeModal,handleIncomeModal,onFinish}) => {

    const [form]=Form.useForm();

    return ( 
        <div>
            <Modal
                title="Add Income"
                visible={isIncomeModal}
                onCancel={handleIncomeModal}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values)=>{
                        onFinish(values,"Income");
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
                        name="amount"
                        rules={[
                            {
                              required: true,
                              message: "Please input the Income Amount!"
                            },
                          ]}
                    >
                        <Input type="number"/>
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
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="freelancing">Freelancing</Select.Option>
                            <Select.Option value="business">Business</Select.Option>
                            <Select.Option value="profit">Profit</Select.Option>
                            <Select.Option value="others">Others</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[
                            {
                              required: true,
                              message: "Please select the date of the income"
                            },
                          ]}
                    >
                        <DatePicker format="YYYY-MM-DD"/>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" className="bg-black text-white rounded-lg">
                            Add Income
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
     );
}
 
export default AddIncomeModal;