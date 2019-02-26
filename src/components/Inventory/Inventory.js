import React, { Component } from "react";
import {
  Select,
  Card,
  Row,
  Input,
  Button,
  Checkbox,
  Form,
  InputNumber,
  DatePicker,
  Table,
  Icon
} from "antd";
import styled from "styled-components";

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

const ItemGrid = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const CardRow = styled(Row)`
  display: flex;
  justify-content: space-around;
`;

const StyledCard = styled(Card)`
  & > .ant-card-body {
    padding-top: 0px;
    margin: 10px;
  }
`;

const StyledFormItem = styled.div`
  & > .ant-form-item {
    margin-bottom: 2px;
  }
`;

const InvWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-bottom: 100px;
`;

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_name: "",
      category: "",
      status: "",
      description: "",
      min_stock: "",
      price: "",
      transaction_type: "",
      purchase_type: "",
      supplier: "",
      location: "",
      remarks: "",
      waybill: "",
      part_number: "",
      exp_date: "",
      manufacture_date: "",
      quantity: "",
      items: [],
      selectedItem: [],
      suppliers: [],
      inventory: [],
      pagination: {},
      disabled: true,
      loading: false,
      validationError: "",
      errors: {}
    };
  }

  handleTopUp = e => {
    e.preventDefault();

    const {
      item_name,
      category,
      description,
      price,
      min_stock,
      status,
      transaction_type,
      purchase_type,
      supplier,
      location,
      remarks,
      waybill,
      part_number,
      manufacture_date,
      exp_date,
      quantity
    } = this.state;

    let newStockItem = {
      item_name,
      category,
      description,
      price,
      min_stock,
      status,
      transaction_type,
      purchase_type,
      supplier,
      location,
      remarks,
      waybill,
      part_number,
      manufacture_date,
      exp_date,
      quantity
    };

    fetch("http://localhost:5000/api/inventory", {
      method: "POST",
      body: JSON.stringify(newStockItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      res
        .json()
        .then(data => {
          // console.log("Payload: " + JSON.stringify(data));
          alert("Stock updated successfully!");
          this.fetchInventory();
        })
        .catch(err => {
          alert("Please fill all fields!");
          console.log(err);
        });
    });
  };

  handlePrice = e => {
    this.setState({ price: e.target.value });
  };

  handleChecked = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  handleLocation = value => {
    this.setState({ location: value });
  };

  handleRemarks = e => {
    this.setState({ remarks: e.target.value });
  };

  handlePartNumber = e => {
    this.setState({ part_number: e.target.value });
  };

  handlePurchaseType = value => {
    this.setState({ purchase_type: value });
  };

  handleQuantity = value => {
    this.setState({ quantity: value });
  };

  handleSupplier = value => {
    this.setState({ supplier: value });
  };

  handleTransactionType = value => {
    this.setState({ transaction_type: value });
  };

  handleWaybill = e => {
    this.setState({ waybill: e.target.value });
  };

  handleExpDate = (date, dateString) => {
    this.setState({ exp_date: dateString });
  };

  handleManDate = (date, dateString) => {
    this.setState({ manufacture_date: dateString });
  };

  handleItemSelect = itemId => {
    let Items = this.state.items;
    //Search for the current item in state
    let newItem = Items.filter(itemById => itemById._id === itemId);
    this.setState({
      selectedItem: newItem
    });
    // console.log("The selected Item is: " + JSON.stringify(newItem));
    //Map items to get selected values
    newItem.map(item =>
      this.setState({
        item_name: item.item_name,
        category: item.category.category_name,
        status: item.status,
        description: item.description,
        price: item.price,
        min_stock: item.min_stock
      })
    );
  };

  fetchItems = () => {
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/items`, { method: "GET" })
      .then(response => response.json())
      .then(items => {
        // console.log(items, items.length);
        const pagination = { ...this.state.pagination };
        //Read total count from server
        pagination.total = items.length;
        this.setState({ loading: false, items: items, pagination });
      })
      .catch(err => console.log(err));
  };

  //Fetching suppliers list from API endpoint.
  fetchSuppliers = () => {
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/suppliers`, { method: "GET" })
      .then(response => response.json())
      .then(suppliers => {
        // console.log(suppliers);
        this.setState({ loading: false, suppliers: suppliers });
        // console.log(this.state.suppliers);
      })
      .catch(err => console.log(err));
  };

  fetchInventory = () => {
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/inventory`, { method: "GET" })
      .then(response => response.json())
      .then(inventory => {
        // console.log(inventory);
        this.setState({ loading: false, inventory: inventory });
        // console.log(this.state.inventory);
      })
      .catch(err => console.log(err));
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });

    this.fetchItems({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    });
  };

  componentDidMount() {
    this.fetchItems();
    this.fetchSuppliers();
  }

  render() {
    return (
      <React.Fragment>
        <InvWrapper>
          <h2>
            Inventory - [Receive Stock]
            <hr
              style={{
                backgroundColor: "#dedede",
                border: "none",
                height: "1px"
              }}
            />
          </h2>
          <CardRow>
            <StyledCard
              title="Item Details"
              bordered={true}
              style={{ width: "24%" }}
            >
              <StyledFormItem>
                <FormItem label="Item Name:">
                  <Select
                    showSearch
                    autoFocus="true"
                    style={{ width: "100%" }}
                    placeholder="Select Item"
                    optionFilterProp="children"
                    onChange={this.handleItemSelect}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.items.map(item => (
                      <Option key={item._id} value={item._id}>
                        {item.item_name}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
                <FormItem label="Category:">
                  <Input value={this.state.category} readOnly />
                </FormItem>
                <FormItem label="Status:">
                  <Input value={this.state.status} readOnly />
                </FormItem>
                <FormItem label="Description:">
                  <TextArea
                    rows={3}
                    style={{ width: "100%", marginBottom: "5px" }}
                    value={this.state.description}
                    readOnly
                  />
                </FormItem>
              </StyledFormItem>
              <ItemGrid>
                <div>
                  <StyledFormItem>
                    <FormItem label="Min Stock Level" style={{ width: "100%" }}>
                      <Input
                        value={this.state.min_stock}
                        readOnly
                        // onChange={console.log("mins stock")}
                      />
                    </FormItem>
                  </StyledFormItem>
                </div>
                <div>
                  <StyledFormItem>
                    <FormItem label="Price">
                      <Input
                        value={this.state.price}
                        onChange={this.handlePrice}
                        readOnly
                      />
                    </FormItem>
                  </StyledFormItem>
                </div>
              </ItemGrid>
            </StyledCard>

            {/* Entering additional information */}

            <StyledCard
              title="Receipt Details"
              bordered={true}
              style={{ width: "24%" }}
            >
              <StyledFormItem>
                <FormItem label="Transaction Type:">
                  <Select
                    showSearch
                    placeholder="Select transaction type"
                    optionFilterProp="children"
                    onChange={this.handleTransactionType}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%" }}
                  >
                    <Option value="Receipt">Receipt</Option>
                    <Option value="Issue">Issue/Delivery</Option>
                  </Select>
                </FormItem>
                <FormItem label="Purchase Type:">
                  <Select
                    showSearch
                    placeholder="Select purchase type"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={this.handlePurchaseType}
                  >
                    <Option value="Foreign">Foreign</Option>
                    <Option value="Local">Local</Option>
                  </Select>
                </FormItem>
                <FormItem label="Supplier:">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select supplier"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={this.handleSupplier}
                  >
                    {this.state.suppliers.map(supplier => (
                      <Option key={supplier._id} value={supplier.supplier_name}>
                        {supplier.supplier_name}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
                <FormItem label="Location(Warehouse):">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select Location"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={this.handleLocation}
                  >
                    <Option value="Tema">Tema</Option>
                    <Option value="Tarkwa">Tarkwa</Option>
                  </Select>
                </FormItem>
                <FormItem label="Remarks:">
                  <TextArea
                    rows={3}
                    style={{ width: "100%", marginBottom: "5px" }}
                    onChange={this.handleRemarks}
                  />
                </FormItem>
              </StyledFormItem>
            </StyledCard>

            <StyledCard
              title="Stock Details"
              bordered={true}
              style={{ width: "24%" }}
            >
              <StyledFormItem>
                <FormItem label="Waybill Number:">
                  <Input
                    placeholder="Enter waybill number"
                    onChange={this.handleWaybill}
                  />
                </FormItem>
                <FormItem label="Part Number:">
                  <Input
                    placeholder="Enter part number"
                    onChange={this.handlePartNumber}
                  />
                </FormItem>
                <FormItem>
                  <Checkbox onChange={this.handleChecked}>Has Expiry?</Checkbox>
                  {/* Research how to disable or enable form controls using checkbox in React */}
                  {/* Edit: Done */}
                </FormItem>
                <FormItem label="Date of Manufacture:">
                  <DatePicker
                    onChange={this.handleManDate}
                    disabled={this.state.disabled}
                    // value={this.state.manufacture_date}
                    style={{ width: "100%" }}
                  />
                </FormItem>
                <FormItem label="Date of Expiry:">
                  <DatePicker
                    onChange={this.handleExpDate}
                    disabled={this.state.disabled}
                    // value={this.state.exp_date}
                    style={{ width: "100%" }}
                  />
                </FormItem>
                <FormItem label="Quantity to Add:">
                  <InputNumber
                    size="large"
                    min={0}
                    max={100000}
                    defaultValue={0}
                    onChange={this.handleQuantity}
                    style={{
                      width: "100%",
                      fontFamily: "verdana",
                      fontWeight: "900",
                      fontSize: "1.5rem",
                      lineHeight: "1.5rem"
                    }}
                  />
                </FormItem>
              </StyledFormItem>
            </StyledCard>

            <StyledCard
              title="Actions"
              bordered={true}
              style={{ width: "24%" }}
            >
              <StyledFormItem>
                <FormItem style={{ width: "100%", paddingRight: "24px" }}>
                  <Button
                    type="primary"
                    block
                    style={{
                      height: "50px",
                      padding: "15px",
                      margin: "10px",
                      width: "100%"
                    }}
                    onClick={this.handleTopUp}
                  >
                    TopUp
                  </Button>
                </FormItem>
              </StyledFormItem>
              <StyledFormItem>
                <FormItem style={{ width: "100%", paddingRight: "24px" }}>
                  <Button
                    type="default"
                    block
                    style={{
                      height: "50px",
                      padding: "15px",
                      margin: "10px",
                      width: "100%"
                    }}
                  >
                    Cancel
                  </Button>
                </FormItem>
              </StyledFormItem>
            </StyledCard>
          </CardRow>

          <div>
            <h2>
              Items List
              <hr
                style={{
                  backgroundColor: "#dedede",
                  border: "none",
                  height: "1px"
                }}
              />
            </h2>

            <Button
              type="primary"
              onClick={this.fetchInventory}
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              <span>
                <Icon
                  style={{ fontSize: "1.5em", marginRight: "5px" }}
                  type="eye"
                />
              </span>
              View Inventory
            </Button>
          </div>

          <Table
            columns={columns}
            style={{ backgroundColor: "#FFFF" }}
            bordered
            size={"small"}
            rowKey={"_id"}
            dataSource={this.state.inventory}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </InvWrapper>
      </React.Fragment>
    );
  }
}

const columns = [
  {
    title: "Item Name",
    dataIndex: "item_name",
    // filters: [
    //   { text: "Male", value: "male" },
    //   { text: "Female", value: "female" }
    // ],
    // sorter: true,
    // render: name => `${name.item_name}`
    width: "15%"
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "15%"
  },
  {
    title: "Category",
    dataIndex: "category",

    width: "10%"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: "9%"
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "9%"
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "9%"
  },
  {
    title: "Remarks",
    dataIndex: "remarks",

    width: "15%"
  },
  {
    title: "Date Updated",
    dataIndex: "updatedAt",
    width: "9%"
  },
  {
    title: "Date Created",
    dataIndex: "createdAt",
    width: "9%"
  }
];
export default Inventory;
