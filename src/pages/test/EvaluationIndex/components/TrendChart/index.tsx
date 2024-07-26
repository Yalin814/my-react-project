import { loadReportChart } from '@/api/ccms/evaluate'
import { Modal, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import './index.scss'

const TrendChart = ({ title = '', deptId = '', open = false, onCancel = () => {} }) => {
  const [spinning, setSpinning] = useState(true)
  const chartRef = useRef(null)
  let trendChart: echarts.ECharts

  const initChart = () => {
    const option: {
      [key: string]: any
      series: {
        data: number[] | string[]
        [key: string]: any
      }[]
    } = {
      title: {
        text: title
      },
      grid: {
        top: 70
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value: string) => Number(value).toFixed(1)
      },
      legend: {
        right: 20
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true
        },
        axisTick: {
          show: true
        },
        name: '比率(%)'
      },
      series: [
        {
          name: '设备上传率',
          type: 'line',
          data: [],
          markPoint: {
            data: [
              {
                type: 'max',
                name: 'Max',
                tooltip: {
                  trigger: 'item',
                  formatter: '设备上传率<br/>上传率最高值：{c}'
                }
              },
              {
                type: 'min',
                name: 'Min',
                tooltip: {
                  trigger: 'item',
                  formatter: '设备上传率<br/>上传率最低值：{c}'
                }
              }
            ],
            label: {
              show: true
            }
          }
        },
        {
          name: '审核及时率',
          type: 'line',
          data: []
        },
        {
          name: 'APP安装率',
          type: 'line',
          data: []
        },
        {
          name: '冷链设备档案表完成率',
          type: 'line',
          data: []
        }
      ]
    }
    if (chartRef.current) {
      trendChart = echarts.init(chartRef.current)

      loadReportChart(deptId)
        .then((res) => {
          setSpinning(false)
          if (res.result) {
            option.xAxis.data = res.result.map((item) => item.rateDate)
            option.series[0]!.data = res.result.map((item) => (item.uploadRate * 100).toFixed(1))
            option.series[1].data = res.result.map((item) => (item.checkRate * 100).toFixed(1))
            option.series[2].data = res.result.map((item) => (item.appInstallRate * 100).toFixed(1))
            option.series[3].data = res.result.map((item) =>
              (item.equipmentCompRate * 100).toFixed(1)
            )
            trendChart.setOption(option)
          }
        })
        .catch(() => {
          setSpinning(false)
        })
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  useEffect(() => {
    initChart()
  }, [])

  return (
    <Modal
      title=""
      className="trend-modal"
      width={1000}
      open={open}
      footer={null}
      onCancel={handleCancel}
    >
      <Spin spinning={spinning} tip="Loading...">
        <div ref={chartRef} className="trend-chart" style={{ height: 400 }}></div>
      </Spin>
    </Modal>
  )
}

export default TrendChart
