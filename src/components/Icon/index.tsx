import './iconfont/iconfont.css'

const Icon = (props) => {
  const { name, style } = props
  return <i className={`iconfont ${name}`} style={style}></i>
}

export default Icon
