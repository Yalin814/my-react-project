import { useEffect } from 'react'
import { QRCode } from 'antd'
import { QRCodeCanvas } from 'qrcode.react'

const QRCodeTest = () => {
  useEffect(() => {}, [])

  return (
    <>
      <div title="Ant Design QR Code">
        <QRCode value="https://ant-design.antgroup.com/components/qr-code-cn?from=msidevs.net" />
      </div>
      <div title="qrcode.react">
        <QRCodeCanvas value="https://www.npmjs.com/package/qrcode.react" />
      </div>
    </>
  )
}

export default QRCodeTest
