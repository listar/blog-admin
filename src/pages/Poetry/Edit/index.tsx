import { Card, Button, Form, Input, Row, Col, message, Spin } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { useEffect, useState } from 'react';
import { poetryAction, poetryDetail } from '../../../services/poetry';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

function Edit(props: any) {
  const id = parseInt(props.match.params.id, 10);
  const [content, setContent] = useState('');
  const [detail, setDetail] = useState({
    Title: '',
    Author: '',
    Content: '',
    Remark: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    poetryDetail({
      ID: id,
    }).then((res) => {
      const { result } = res.data;
      setDetail(result);
      setContent(result.Remark);
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
      id,
      ...values,
      Remark: content,
    };

    poetryAction(pushData).then((res) => {
      if (res.code) {
        message.error(res.msg);
        return;
      }
      message.success(`成功${id ? '更新' : '新增'}`);
      history.goBack();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // Finish!
  function handleEditorChange({ text }) {
    // console.log('handleEditorChange', html, text);
    setContent(text);
  }

  return (
    <PageContainer title={id ? '更新诗词歌赋' : '添加诗词歌赋'}>
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
              label="正文"
              name="Content"
              rules={[{ required: true, message: '请您输入正文!' }]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>

            <Row>
              <Col
                span={4}
                style={{
                  textAlign: 'right',
                }}
              >
                备注：
              </Col>
              <Col span={20}>
                <MdEditor
                  defaultValue={detail.Remark}
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
