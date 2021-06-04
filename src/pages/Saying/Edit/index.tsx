import {
  Tag,
  Space,
  Card,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  message,
  Spin,
} from 'antd';
import { FormattedMessage, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
// import style manually
import { useEffect, useState } from 'react';
import { sayingAction, sayingDetail } from '../../../services/saying';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

function Edit(props: any) {
  const id = parseInt(props.match.params.id);
  const [detail, setDetail] = useState({
    Author: '',
    Content: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    sayingDetail({
      ID: id,
    }).then((res) => {
      setDetail(res.data.result);
      setLoading(false);
    });
  }, [id]);


  const onFinish = (values: any) => {
    const pushData = {
      id: id,
      ...values,
    };

    sayingAction(pushData).then((res) => {
      if (res.code) {
        message.error(res.msg);
        return;
      }
      message.success('成功' + (id ? '更新' : '新增'));
      history.goBack();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageContainer title={id ? '更新名言' : '添加名言'}>
      <Card>
        {loading ? (
          <Spin size="large"></Spin>
        ) : (
          <Form
            {...layout}
            name="basic"
            initialValues={detail}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="作者"
              name="Author"
              rules={[{ required: false, message: '请您输入作者!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="名言"
              name="Content"
              rules={[{ required: true, message: '请您输入名言!' }]}
            >
              <Input.TextArea rows={6}></Input.TextArea>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {id ? '更新' : '添加'}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </PageContainer>
  );
}

export default Edit;
