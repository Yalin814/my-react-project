import './iconfont/iconfont.css'

const Icon = (props) => {
  const { name, style, onClick } = props
  return <i className={`iconfont ${name}`} style={style} onClick={onClick}></i>
}

export default Icon
