import { loadReportChart } from '@/api/ccms/evaluate'
import { Modal } from 'antd'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { ECBasicOption } from 'echarts/types/src/util/types.js'
import './index.scss'

const TrendChart = ({
  title = '',
  deptId = '30D442E53F2F4A1A91A096AFEBBADAF6',
  open = false,
  onCancel = () => {}
}) => {
  const chartRef = useRef(null)
  let trendChart: echarts.ECharts

  const initChart = () => {
    const option: ECBasicOption = {
      title: {
        text: title
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        right: 20
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
          data: [10, 11, 63, 11, 12, 12, 9],
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          }
        },
        {
          name: '审核及时率',
          type: 'line',
          data: [0, 15, 3, 11, 72, 12, 9]
        },
        {
          name: 'APP安装率',
          type: 'line',
          data: [72, 12, 9, 0, 15, 3, 11]
        },
        {
          name: '冷链设备档案表完成率',
          type: 'line',
          data: [9, 0, 72, 12, 15, 3, 11]
        }
      ]
    }
    if (chartRef.current) {
      trendChart = echarts.init(chartRef.current)

      loadReportChart(deptId).then((res) => {
        if (res.result) {
          option.xAxis.data = res.result.map((item) => item.rateDate)
          option.series[0].data = res.result.map((item) => (item.uploadRate * 100).toFixed(1))
          option.series[1].data = res.result.map((item) => (item.checkRate * 100).toFixed(1))
          option.series[2].data = res.result.map((item) => (item.appInstallRate * 100).toFixed(1))
          option.series[3].data = res.result.map((item) =>
            (item.equipmentCompRate * 100).toFixed(1)
          )
          trendChart.setOption(option)
        }
      })
    }
  }

  useEffect(() => {
    if (open) initChart()
  }, [open])

  return (
    <Modal
      title=""
      className="trend-modal"
      width={1000}
      open={open}
      footer={null}
      onCancel={onCancel}
    >
      <div ref={chartRef} className="trend-chart" style={{ height: 400 }}></div>
    </Modal>
  )
}

export default TrendChart
