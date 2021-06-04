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
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from 'react';
import { articleAction, articleDetail } from '../../../services/article';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

function Edit(props: any) {
  const id = parseInt(props.match.params.id);
  const [content, setContent] = useState('');
  const [detail, setDetail] = useState({
    Title: '',
    Author: '',
    OuterLink: '',
    Tags: [],
    Content: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    articleDetail({
      ID: id,
    }).then((res) => {
      let _data = res.data.result;
      _data.Tags = _data.Tags.split(',');
      setDetail(_data);
      setContent(_data.Content)
      setLoading(false);
    });
  }, [id]);

  // 初始化Markdown解析器
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const onFinish = (values: any) => {
    if (!content.length) {
      message.error('正文不能为空！！');
      return;
    }
    const pushData = {
      id: id,
      ...detail,
      ...values,
      Tags: values.Tags.toString(),
      Content: content,
    };

    articleAction(pushData).then((res) => {
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
  // Finish!
  function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
    setContent(text);
  }

  return (
    <PageContainer title={id ? '更新文章' : '添加文章'}>
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
              label="标题"
              name="Title"
              rules={[{ required: true, message: '请您输入标题!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="作者"
              name="Author"
              rules={[{ required: false, message: '请您输入作者!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="外链"
              name="OuterLink"
              rules={[{ required: false, message: '请您输入外链!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="标签"
              name="Tags"
              rules={[{ required: true, message: '请您输入标签!' }]}
            >
              <Select mode="tags" placeholder="标签"></Select>
            </Form.Item>

            <Row>
              <Col
                span={4}
                style={{
                  textAlign: 'right',
                }}
              >
                正文：
              </Col>
              <Col span={20}>
                <MdEditor
                  defaultValue={detail.Content}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                ></MdEditor>
              </Col>
            </Row>
            <Form.Item {...tailLayout}></Form.Item>

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