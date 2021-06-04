import { Table, Tag, Space, Card, Button, message, Popconfirm } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FormattedMessage, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { articleList, articleDel } from '../../services/article';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: '标题',
    dataIndex: 'Title',
    key: 'title',
    render: (text, record) => (
      <a href={`http://www.qqfav.com/article/${record.ID}`} target="blank">
        {text}
      </a>
    ),
  },
  {
    title: '状态',
    dataIndex: 'Status',
    key: 'status',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'Tags',
    render: (tags) => (
      <>
        {tags &&
          tags.split(',').map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            history.push('/article/edit/' + record.ID);
          }}
        >
          编辑
        </a>
        <Popconfirm
          title="您确定要删除吗？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => {
            articleDel({
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
    articleList({
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
    history.push('/article/edit/0');
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
