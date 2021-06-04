import { Table, Space, Card, Button, message, Popconfirm } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FormattedMessage, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { poetryList, poetryDel } from '../../services/poetry';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: '标题',
    dataIndex: 'Title',
    key: 'Title',
  },
  {
    title: '作者',
    dataIndex: 'Author',
    key: 'author',
  },
  {
    title: '添加时间',
    dataIndex: 'CreatedAt',
    key: 'created_at',
    render: (text) => text.slice(0, 10),
  },

  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            history.push(`/poetry/edit/${record.ID}`);
          }}
        >
          编辑
        </a>
        <Popconfirm
          title="您确定要删除吗？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => {
            poetryDel({
              ID: record.ID,
            }).then((res) => {
              if (res.code) {
                message.error(res.msg);
                return;
              }
              message.success('成功删除！');
            });
          }}
        >
          <a href="#">删除</a>
        </Popconfirm>
      </Space>
    ),
  },
];

function ListPage() {
  const [listData, setListData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [Pagination, setPagination] = useState({
    pageSize: 10,
    total: 0,
    onChange: (page: number) => {
      setPageIndex(page);
    },
  });

  useEffect(() => {
    poetryList({
      pageIndex,
      pageSize: Pagination.pageSize,
    }).then((res: any) => {
      if (res.code) {
        message.error(res.msg);
        return;
      }
      setListData(res.data.result);
      setPagination({
        ...Pagination,
        total: res.data.total || 0,
      });
    });
  }, [pageIndex]);

  function handleAdd() {
    history.push('/poetry/edit/0');
  }

  return (
    <PageContainer>
      <Card>
        <div
          style={{
            paddingBottom: '20px',
            textAlign: 'right',
          }}
        >
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAdd();
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>
        </div>
        <Table columns={columns} dataSource={listData} pagination={Pagination} />
      </Card>
    </PageContainer>
  );
}

export default ListPage;
