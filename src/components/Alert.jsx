

const Alert = ( {alert} ) => {
  return (
    <div className={`${alert.error ? 'from-red-300 to-red-600' : 'from-sky-300 to-sky-600'} bg-gradient-to-b text-center p-3 rounded uppercase text-white font-bold text-sm my-10`}>
        {alert.msg}
    </div>
  )
}

export default Alert