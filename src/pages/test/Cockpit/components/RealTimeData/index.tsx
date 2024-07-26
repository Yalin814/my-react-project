import { loadSensorsByDeptId } from '@/api/ccms/cab'
import { LoadSensorsByDeptIdResp, SensorType, sensorTypeKV } from '@/api/ccms/cab/types'
import {
  Modal,
  Dropdown,
  Table,
  TableColumnsType,
  Button,
  Checkbox,
  CheckboxOptionType,
  List
} from 'antd'
import { useEffect, useState } from 'react'
import { SyncOutlined, ProfileOutlined, TableOutlined } from '@ant-design/icons'
import './index.scss'

const RealTimeData = ({ open = false, deptId = '', onCancel = () => {} }) => {
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(true)
  const [dataSource, setDataSource] = useState<LoadSensorsByDeptIdResp[]>([])
  const tableColumns: TableColumnsType<LoadSensorsByDeptIdResp> = [
    {
      title: '探温点',
      dataIndex: 'sensorDesc',
      key: 'sensorDesc',
      render(text) {
        return text || '-'
      }
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      render(text) {
        return text || '-'
      }
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      render(text) {
        return text || '-'
      }
    },
    {
      title: '范围',
      dataIndex: 'range',
      key: 'range',
      render(text) {
        return text || '-'
      },
      width: 140
    },
    {
      title: '最后测量时间',
      dataIndex: 'reportedTemperatureDept',
      key: 'reportedTemperatureDept',
      width: 170,
      render(text) {
        return text || '-'
      }
    },
    {
      title: '当前温度',
      dataIndex: 'currentTemp',
      key: 'currentTemp',
      width: 90,
      render(text) {
        return text == null ? '-' : text
      }
    },
    {
      title: '当前湿度',
      width: 90,
      dataIndex: 'currentHumidity',
      key: 'currentHumidity',
      render(text) {
        return text == null ? '-' : text
      }
    },
    {
      title: '传感器状态',
      dataIndex: 'remark',
      key: 'remark',
      render(text) {
        return text || '-'
      }
    },
    {
      title: '类型',
      dataIndex: 'sensorType',
      key: 'sensorType',
      render(text) {
        return text ? sensorTypeKV[text as SensorType] : '-'
      }
    }
  ]
  const [checkedList, setCheckedList] = useState(tableColumns.map((item) => item.key))
  const options = tableColumns.map((item) => ({
    label: item.title,
    value: item.key
  }))

  const newColumns = tableColumns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key)
  }))

  const fetchSensorsByDeptId = () => {
    loadSensorsByDeptId({ deptId, _: Date.now() })
      .then((res) => {
        setLoading(false)
        if (res.result) {
          setDataSource(res.result)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchSensorsByDeptId()
  }

  const handleToggle = () => {
    setToggle((toggle) => !toggle)
  }

  useEffect(() => {
    fetchSensorsByDeptId()
  }, [])

  return (
    <Modal
      title="实时温湿度"
      className="real-time-data"
      width={1100}
      open={open}
      footer={null}
      onCancel={onCancel}
    >
      <div className="options">
        <Button.Group>
          <Button onClick={handleRefresh}>
            <SyncOutlined />
          </Button>
          <Button onClick={handleToggle}>
            <ProfileOutlined />
          </Button>
          <Dropdown
            placement="bottomRight"
            trigger={['click']}
            dropdownRender={() => (
              <div className="dropdown-menu">
                <Checkbox.Group
                  value={checkedList}
                  options={options as CheckboxOptionType[]}
                  onChange={(value) => setCheckedList(value)}
                />
              </div>
            )}
          >
            <Button>
              <TableOutlined />
            </Button>
          </Dropdown>
        </Button.Group>
      </div>
      {toggle ? (
        <Table
          scroll={{ y: 500 }}
          pagination={false}
          bordered
          rowKey="id"
          loading={loading}
          dataSource={dataSource}
          columns={newColumns}
        ></Table>
      ) : (
        <List
          bordered
          className="data-list"
          loading={loading}
          dataSource={dataSource}
          rowKey={(item) => item.id}
          renderItem={(item) => (
            <div className="list-item" key={item.id}>
              {newColumns
                .filter((column) => !column.hidden)
                .map((column) => (
                  <div className="list-item-row" key={column.key}>
                    <span>{column.title + ''}</span>
                    {column.key == 'sensorType' ? (
                      <span>
                        {item[column.key + ''] == null
                          ? '-'
                          : sensorTypeKV[item[column.key + ''] as SensorType]}
                      </span>
                    ) : (
                      <span>{item[column.key + ''] == null ? '-' : item[column.key + '']}</span>
                    )}
                  </div>
                ))}
            </div>
          )}
        ></List>
      )}
    </Modal>
  )
}

export default RealTimeData
