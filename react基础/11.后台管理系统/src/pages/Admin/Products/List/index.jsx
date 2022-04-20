import React, { Component } from 'react';
import { Button, Card, Table, Popconfirm } from 'antd'

const datas = [
  {
    id: 1,
    key: 1,
    name: '香皂',
    price: 5
  }, {
    id: 2,
    key: 2,
    name: '特仑苏',
    price: 55
  }, {
    id: 3,
    key: 3,
    name: '球鞋',
    price: 867
  }
]

class List extends Component {
  render () {
    const columns = [
      {
        title: '序号',
        key: 'id',
        width: 80,
        align: 'center',
        render: (text, record, index) => text.id
      }, {
        title: '名字',
        key: 'name',
        dataIndex: 'name'
      }, {
        title: '价格',
        key: 'price',
        dataIndex: 'price'
      }, {
        title: '操作',
        key: 'multi',
        width: 200,
        render: text => (
          <div>
            <Button type="primary" size="small">修改</Button>&nbsp;
            <Popconfirm
              title="确定要删除该项吗?"
              onCancel={() => console.log('用户取消删除')}
              onConfirm={() => {
                console.log('用户确认删除');
                // 调取API接口进行操作
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" size="small">删除</Button>
            </Popconfirm>
          </div>

        )
      }
    ]
    return (
      <Card
        title="商品列表"
        extra={
          <Button
            type="primary"
            size="small"
            onClick={() => this.props.history.push('/admin/products/edit')}
          >
            新增
          </Button>
        }>
        <Table columns={columns} bordered dataSource={datas} />
      </Card>
    );
  }
}

export default List;