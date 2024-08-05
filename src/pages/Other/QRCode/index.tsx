import { useEffect } from 'react'
import { QRCode } from 'antd'

const QRCodeTest = () => {
  useEffect(() => {}, [])

  return (
    <>
      <div id="qrcode"></div>
      <QRCode value="https://ant-design.antgroup.com/components/qr-code-cn?from=msidevs.net" />
    </>
  )
}

export default QRCodeTest
