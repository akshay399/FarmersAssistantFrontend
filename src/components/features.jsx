import { color } from "@mui/system"

export const Features = (props) => {
  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className="section-title">
          <h2 style={{paddingTop:"5rem", color:"black"   , fontSize: 28,}}>Our website will help you answer following questions</h2>
        </div>
        <div className='row' style={{ marginBottom: "70px"}}>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-xs-6 col-md-3'>
                  {' '}
                  <i className={d.icon}></i>
                  <h3 style={{color:"black"}}>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  )
}
