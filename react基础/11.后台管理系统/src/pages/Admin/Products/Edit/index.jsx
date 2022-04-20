import React, { Component } from 'react';
import { Form, Card, Input, Button, message } from 'antd';

class Edit extends Component {
  formRef = React.createRef();

  onFinish = values => {
    console.log(values);
  }

  onFinishFailed = ({ errorFields }) => {
    message.error('信息错误！');
    this.formRef.current.scrollToField(errorFields[0].name);
  }

  priceValidate = (rule, value, callback) => {
    if(isNaN(+value)) {
      callback('请输入正确价格');
    } else {
      callback();
    }
  }

  render () {
    return (
      <Card title="商品编辑">
        <Form 
          onFinish={this.onFinish} 
          onFinishFailed={this.onFinishFailed}
          ref={this.formRef}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              { 
                required: true, 
                message: '商品名称不能为空!' 
              }
            ]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="price"
            rules={[
              { 
                required: true, 
                message: '商品价格不能为空!' 
              },
              {
                validator: this.priceValidate
              }
            ]}
          >
            <Input placeholder="请输入商品价格" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">保存</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Edit;