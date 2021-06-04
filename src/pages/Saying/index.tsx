import { Table, Tag, Space, Card, Button, message, Popconfirm } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FormattedMessage, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { sayingList, sayingDel } from '../../services/saying';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: '作者',
    dataIndex: 'Author',
    key: 'title',
  },
  {
    title: '名言',
    dataIndex: 'Content',
    key: 'Content',
  },

  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a
          onClick={() => {
            history.push('/saying/edit/' + record.ID);
          }}
        >
          编辑
        </a>
        <Popconfirm
          title="您确定要删除吗？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => {
            sayingDel({
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
    sayingList({
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
    history.push('/saying/edit/0');
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
